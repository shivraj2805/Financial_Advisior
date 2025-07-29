#!/bin/bash

# Production Deployment Script
echo "🚀 Starting production deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if dayjs is installed
if ! npm list dayjs > /dev/null 2>&1; then
    echo "⚠️  dayjs not found, installing..."
    npm install dayjs
fi

# Create uploads directory if it doesn't exist
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Set production environment
export NODE_ENV=production

# Start the server
echo "🟢 Starting server on port $PORT..."
node index.js 