#!/bin/bash

echo "🚀 Accelerator SaaS Setup Script"
echo "================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo "✅ pnpm found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup database package
echo "📊 Setting up database..."
cd packages/db
pnpm install
npx prisma generate
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy .env.example to .env.local and fill in your environment variables"
echo "2. Create a PostgreSQL database and set DATABASE_URL"
echo "3. Run: cd packages/db && npx prisma db push"
echo "4. Run: cd packages/db && pnpm seed"
echo "5. Run: pnpm dev"
echo ""
echo "📖 Read ACCELERATOR_README.md for detailed setup instructions"
echo ""
