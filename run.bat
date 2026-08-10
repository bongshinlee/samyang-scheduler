@echo off
chcp 65001 > nul
echo ==============================================
echo   Samyang Scheduler Python Server Launching...
echo ==============================================
echo.
echo   - 내 PC에서만 테스트할 때 사용하는 서버입니다.
echo     저장 버튼을 누르면 schedule-state.json 에 저장됩니다.
echo   - 실제 팀 공유는 Netlify 주소에서 이루어집니다.
echo   - 사용이 끝나면 이 창을 닫아주세요.
echo.
echo   서버 주소: http://localhost:8000
echo ==============================================
echo.
start http://localhost:8000
python server.py
pause
