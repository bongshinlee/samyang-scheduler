import datetime
import http.server
import json
import os
import socketserver
import sys
import threading

PORT = 8000

# Local stand-in for the Netlify Blobs store, so the shared-save flow can be
# tested offline with exactly the same client code path.
STATE_FILE = 'schedule-state.json'
EMPTY_STATE = {"tasks": None, "version": 0, "updatedAt": None}

# Serialises the read-modify-write of the state file across request threads.
STATE_LOCK = threading.Lock()


def state_path():
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), STATE_FILE)


def read_state():
    try:
        with open(state_path(), 'r', encoding='utf-8') as f:
            return json.load(f)
    except (IOError, ValueError):
        return None


def write_state(state):
    with open(state_path(), 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def send_json(self, data, status=200):
        payload = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def end_headers(self):
        # Mirror the Netlify cache policy so local testing matches production
        # and never runs a stale app.js.
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/api/schedule':
            self.send_json(read_state() or EMPTY_STATE)
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split('?')[0]

        if path == '/api/schedule':
            self.handle_shared_save()
        elif path == '/save':
            self.handle_legacy_save()
        else:
            super().do_POST()

    def handle_shared_save(self):
        content_length = int(self.headers.get('Content-Length') or 0)
        try:
            body = json.loads(self.rfile.read(content_length).decode('utf-8'))
        except ValueError:
            self.send_json({"error": "invalid json"}, 400)
            return

        tasks = body.get('tasks')
        if not isinstance(tasks, list):
            self.send_json({"error": "tasks must be an array"}, 400)
            return

        with STATE_LOCK:
            current = read_state()
            current_version = (current or {}).get('version') or 0
            base_version = body.get('baseVersion') or 0

            if current and base_version != current_version:
                conflict = {"error": "conflict"}
                conflict.update(current)
                self.send_json(conflict, 409)
                return

            next_state = {
                "tasks": tasks,
                "version": current_version + 1,
                "updatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            }
            write_state(next_state)

        self.send_json(next_state)

    def handle_legacy_save(self):
        content_length = int(self.headers.get('Content-Length') or 0)
        post_data = self.rfile.read(content_length)
        try:
            tasks_data = json.loads(post_data.decode('utf-8'))

            # Format the new data.js content
            file_content = f"// Smart Scheduler Initial Seed Data\nconst INITIAL_DATA = {json.dumps(tasks_data, indent=2, ensure_ascii=False)};\n\nif (typeof window !== 'undefined') {{\n  window.INITIAL_DATA = INITIAL_DATA;\n}}\n"

            # Write directly to data.js in the same folder
            script_dir = os.path.dirname(os.path.abspath(__file__))
            data_file_path = os.path.join(script_dir, 'data.js')

            with open(data_file_path, 'w', encoding='utf-8') as f:
                f.write(file_content)

            self.send_json({"status": "success"})
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode('utf-8'))


# Set working directory to the folder containing the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))


# Threaded so one client polling for updates can't block everyone else,
# and allow port reuse to avoid "address already in use" on quick restarts.
class ReuseAddrHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


server = ReuseAddrHTTPServer(('localhost', PORT), MyHandler)
print(f"Samyang Scheduler Python Server is running on http://localhost:{PORT}")
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
    sys.exit(0)
