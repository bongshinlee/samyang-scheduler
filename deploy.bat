@echo off
setlocal enabledelayedexpansion

echo ==============================================
echo   Samyang Scheduler Auto-Uploader
echo ==============================================
echo.

:: 1. Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo Please install Git and try again.
    pause
    exit /b
)

:: 2. Initialize Git if not exists
if exist .git goto GIT_INIT_DONE
echo [1/3] Initializing Git repository...
git init
git branch -M main
:GIT_INIT_DONE

:: 3. Check remote origin
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 goto GIT_REMOTE_DONE

echo.
echo [IMPORTANT] GitHub repository URL is not set yet.
echo Please copy your GitHub repo URL (HTTPS) and paste it below.
echo.
set /p repo_url="Enter GitHub Repo URL (e.g. https://github.com/user/repo.git): "
if "%repo_url%"=="" (
    echo [ERROR] No URL entered. Aborting upload.
    pause
    exit /b
)

git remote add origin %repo_url%
echo Remote origin set to: %repo_url%

:GIT_REMOTE_DONE

echo.
echo [2/3] Committing changes...
git add .
git commit -m "Update schedules"

echo.
echo [3/3] Uploading to GitHub...
git push -u origin main

echo.
echo ==============================================
echo   Deploy Complete!
echo   It will take 1-2 minutes to update online.
echo ==============================================
echo.
pause
