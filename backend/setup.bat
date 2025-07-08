@echo off
echo 🚀 Setting up PromptStack Frontend...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo 📝 Creating .env.local file...
    (
        echo # Local environment variables
        echo VITE_APP_NAME=PromptStack
        echo VITE_API_URL=http://localhost:3000
    ) > .env.local
    echo ✅ .env.local created
)

echo.
echo 🎉 Setup complete! You can now run:
echo.
echo   npm run dev      # Start development server
echo   npm run build    # Build for production
echo   npm run preview  # Preview production build
echo.
echo 🌐 The app will be available at http://localhost:5173
echo.
pause
