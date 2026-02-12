@echo off
echo ========================================
echo     UPLOAD SYSTEM STARTUP SCRIPT
echo ========================================
echo.

echo [1/4] Checking system...
cd /d "%~dp0"
if not exist "package.json" (
    echo ❌ ERROR: package.json not found!
    pause
    exit /b 1
)
echo ✅ package.json found

echo.
echo [2/4] Installing dependencies...
call npm install express multer cors concurrently
if errorlevel 1 (
    echo ❌ ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo [3/4] Creating directories...
if not exist "public\uploads" mkdir "public\uploads"
if not exist "public\uploads\logos" mkdir "public\uploads\logos"
if not exist "public\uploads\gallery" mkdir "public\uploads\gallery"
if not exist "public\uploads\team" mkdir "public\uploads\team"
echo ✅ Directories created

echo.
echo [4/4] Starting servers...
echo.
echo 🚀 Starting Upload Server (Port 3001)...
start "Upload Server" cmd /k "npm run server"

echo 🚀 Starting Frontend (Port 5173)...
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo ✅ UPLOAD SYSTEM STARTED SUCCESSFULLY!
echo ========================================
echo.
echo 📡 Upload Server: http://localhost:3001
echo 🖥️  Frontend:      http://localhost:5173
echo 👤 Admin Panel:    http://localhost:5173/admin
echo.
echo 🧪 To test uploads:
echo    1. Open admin panel
echo    2. Go to Clients Management
echo    3. Click "🔍 Debug Upload"
echo    4. Check console for results
echo.
echo 📁 Uploaded files will be saved in:
echo    public\uploads\logos\
echo    public\uploads\gallery\
echo    public\uploads\team\
echo.
echo Press any key to exit this window...
pause >nul
