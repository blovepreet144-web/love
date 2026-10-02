@echo off
title Portfolio Project - Local Server (Port 8081)
color 0B
cls

echo ======================================================================
echo       NEW PROJECT (PORTFOLIO) - LOCALHOST SERVER (PORT 8081)
echo ======================================================================
echo.

set "PATH=%PATH%;C:\Program Files\nodejs;C:\Program Files (x86)\nodejs;%APPDATA%\npm;%USERPROFILE%\.bun\bin;%LOCALAPPDATA%\Programs\nodejs;%NVM_HOME%;%NVM_SYMLINK%;C:\Program Files\nvm;%APPDATA%\nvm;%LOCALAPPDATA%\Volta\bin;C:\ProgramData\chocolatey\bin;%LOCALAPPDATA%\Programs\pnpm"

cd /d "%~dp0"

echo [LOG] Started at %DATE% %TIME% > "%~dp0server-log.txt"
echo [LOG] Directory: %CD% >> "%~dp0server-log.txt"
echo [LOG] Checking node: >> "%~dp0server-log.txt"
call node -v >> "%~dp0server-log.txt" 2>&1
echo [LOG] Checking npm: >> "%~dp0server-log.txt"
call npm -v >> "%~dp0server-log.txt" 2>&1
echo [LOG] Checking bun: >> "%~dp0server-log.txt"
call bun -v >> "%~dp0server-log.txt" 2>&1

if not exist node_modules (
    echo [1/2] Installing required project packages...
    echo [LOG] Installing packages... >> "%~dp0server-log.txt"
    call bun --version >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [INFO] Bun detected! Fast-installing with bun...
        echo [LOG] Running bun install >> "%~dp0server-log.txt"
        call bun install >> "%~dp0server-log.txt" 2>&1
    ) else (
        echo [INFO] Node/npm detected. Installing with npm...
        echo [LOG] Running npm install >> "%~dp0server-log.txt"
        call npm install --no-audit --no-fund >> "%~dp0server-log.txt" 2>&1
    )
)

echo.
echo ======================================================================
echo [2/2] Starting Local Server at: http://localhost:8081
echo [LOG] Starting dev server >> "%~dp0server-log.txt"
echo Opening browser automatically...
echo *** KEEP THIS WINDOW OPEN WHILE VIEWING THE WEBSITE! ***
echo ======================================================================
echo.

start "" "http://localhost:8081"

call npm run dev
if %ERRORLEVEL% NEQ 0 (
    call bun run dev
)

pause
