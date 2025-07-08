#!/bin/bash

# PromptStack Frontend Setup Script
echo "🚀 Setting up PromptStack Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# Local environment variables
VITE_APP_NAME=PromptStack
VITE_API_URL=http://localhost:3000
EOL
    echo "✅ .env.local created"
fi

echo ""
echo "🎉 Setup complete! You can now run:"
echo ""
echo "  npm run dev      # Start development server"
echo "  npm run build    # Build for production"
echo "  npm run preview  # Preview production build"
echo ""
echo "🌐 The app will be available at http://localhost:5173"
echo ""
