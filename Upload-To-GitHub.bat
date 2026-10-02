@echo off
setlocal enabledelayedexpansion
title Uploading Lovepreet Portfolio to GitHub...

echo ======================================================================
echo    LOVEPREET WEB PORTFOLIO - GITHUB AUTOMATIC UPLOADER
echo ======================================================================
echo.

cd /d "%~dp0"
if exist "Install" del /f /q "Install" >nul 2>nul

:check_git
set "GIT_CMD="
if exist "%~dp0git-portable\cmd\git.exe" (
    set "GIT_CMD=%~dp0git-portable\cmd\git.exe"
) else if exist "%~dp0git-portable\bin\git.exe" (
    set "GIT_CMD=%~dp0git-portable\bin\git.exe"
) else if exist "C:\Program Files\Git\cmd\git.exe" (
    set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
) else if exist "C:\Program Files\Git\bin\git.exe" (
    set "GIT_CMD=C:\Program Files\Git\bin\git.exe"
) else if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
) else if exist "%LOCALAPPDATA%\Programs\Git\bin\git.exe" (
    set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\bin\git.exe"
) else (
    where git >nul 2>nul
    if %errorlevel% equ 0 set "GIT_CMD=git"
)

if "!GIT_CMD!"=="" (
    echo [*] Git is not yet installed on this PC.
    if exist "Install-Git.exe" (
        echo [*] Launching Git installer now...
        echo [*] Please click "Next" -^> "Next" -^> "Install" on the installer setup window.
        echo.
        start /wait "" "Install-Git.exe"
        echo.
        echo [*] Git setup finished. Resuming upload...
        timeout /t 3 /nobreak >nul
        goto check_git
    ) else (
        echo [ERROR] Install-Git.exe not found in this folder.
        pause
        exit /b 1
    )
)

echo [OK] Using Git: "!GIT_CMD!"
echo.

:: 1. Initialize Git repository if needed
if not exist ".git" (
    echo [*] Initializing Git repository...
    "!GIT_CMD!" init -b main
) else (
    echo [OK] Git repository already initialized.
)

:: 2. Configure Git identity
"!GIT_CMD!" config user.name "Lovepreet Singh Bhangu"
"!GIT_CMD!" config user.email "blovepreet144@gmail.com"

:: 3. Set GitHub remote
echo [*] Setting GitHub remote URL...
"!GIT_CMD!" remote remove origin >nul 2>nul
"!GIT_CMD!" remote add origin https://github.com/blovepreet144-web/love.git

:: 4. Add all source files (node_modules is excluded by .gitignore)
echo [*] Staging all project files (excluding node_modules, build caches, and installer binaries)...
"!GIT_CMD!" add -A

:: 5. Commit
echo [*] Creating commit...
"!GIT_CMD!" commit -m "Upload complete portfolio with updated assets, media, and Vercel configuration"

:: 6. Set branch to main
"!GIT_CMD!" branch -M main

:: 7. Push to GitHub
echo.
echo ======================================================================
echo  PUSHING ALL FILES TO GITHUB: https://github.com/blovepreet144-web/love
echo ======================================================================
echo.
echo A GitHub sign-in window will open in your browser.
echo Click "Sign in with your browser" or "Authorize" to upload.
echo.

"!GIT_CMD!" push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ======================================================================
    echo  SUCCESS! ALL FILES ARE UPLOADED TO GITHUB!
    echo  Vercel is now automatically building your live site!
    echo  Check live site in 1 minute: https://lovepreetwebin-sfp7.vercel.app
    echo ======================================================================
) else (
    echo.
    echo [!] If authentication is needed, please complete the sign-in in your browser.
)

echo.
pause
