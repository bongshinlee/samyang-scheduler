// Shared schedule storage backed by Netlify Blobs.
// GET  /api/schedule -> { tasks, version, updatedAt }
// POST /api/schedule -> saves { tasks, baseVersion }, returns the new state.
//   Returns 409 with the current server state if baseVersion is stale,
//   so a save never silently wipes out someone else's work.
import { getStore } from '@netlify/blobs';

const STORE_NAME = 'samyang-scheduler';
const KEY = 'schedule-state';

const EMPTY = { tasks: null, version: 0, updatedAt: null };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export default async (req) => {
  const store = getStore(STORE_NAME);

  if (req.method === 'GET') {
    const state = await store.get(KEY, { type: 'json' });
    return json(state || EMPTY);
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'invalid json' }, 400);
    }

    if (!Array.isArray(body?.tasks)) {
      return json({ error: 'tasks must be an array' }, 400);
    }

    const current = await store.get(KEY, { type: 'json' });
    const currentVersion = current?.version || 0;
    const baseVersion = Number(body.baseVersion) || 0;

    if (current && baseVersion !== currentVersion) {
      return json({ error: 'conflict', ...current }, 409);
    }

    const next = {
      tasks: body.tasks,
      version: currentVersion + 1,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(KEY, next);
    return json(next);
  }

  return json({ error: 'method not allowed' }, 405);
};

export const config = { path: '/api/schedule' };
