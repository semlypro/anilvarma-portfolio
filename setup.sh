#!/bin/bash

# ===========================================
# Anil Varma SEO Portfolio - Setup Script
# ===========================================
# Run this script once to set up the project
# Then start Ralph for autonomous backend development
# ===========================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🚀 Anil Varma SEO Portfolio - Project Setup              ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v) detected${NC}"

# Step 1: Install dependencies
echo -e "\n${YELLOW}📦 Step 1: Installing dependencies...${NC}"
npm install

echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 2: Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "\n${YELLOW}🔑 Step 2: Creating .env.local from template...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ .env.local created${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env.local and add your API keys before continuing!${NC}"
else
    echo -e "\n${GREEN}✅ .env.local already exists${NC}"
fi

# Step 3: Check if Sanity CLI is installed
echo -e "\n${YELLOW}📋 Step 3: Checking Sanity CLI...${NC}"
if ! command -v sanity &> /dev/null; then
    echo -e "${YELLOW}Installing Sanity CLI globally...${NC}"
    npm install -g @sanity/cli
fi
echo -e "${GREEN}✅ Sanity CLI ready${NC}"

# Step 4: Check if Ralph is installed (optional)
echo -e "\n${YELLOW}🤖 Step 4: Checking Ralph CLI...${NC}"
if command -v ralph &> /dev/null; then
    echo -e "${GREEN}✅ Ralph CLI detected${NC}"
else
    echo -e "${YELLOW}⚠️  Ralph is not installed. Install it for autonomous backend development:${NC}"
    echo -e "${BLUE}   git clone https://github.com/frankbria/ralph-claude-code.git${NC}"
    echo -e "${BLUE}   cd ralph-claude-code && ./install.sh${NC}"
fi

# Step 5: Create necessary directories
echo -e "\n${YELLOW}📁 Step 5: Verifying project structure...${NC}"
mkdir -p public/images
mkdir -p __tests__/api
mkdir -p __tests__/lib
mkdir -p __tests__/components
echo -e "${GREEN}✅ Project structure verified${NC}"

# Step 6: Initialize Git if not already
if [ ! -d .git ]; then
    echo -e "\n${YELLOW}📚 Step 6: Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "\n${GREEN}✅ Git repository already initialized${NC}"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/
build

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Sanity
.sanity
EOF
    echo -e "${GREEN}✅ .gitignore created${NC}"
fi

# Summary
echo -e "\n${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     ✅ Setup Complete!                                       ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "1. ${BLUE}Edit .env.local${NC} and add your API keys:"
echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "   - SANITY_API_TOKEN"
echo "   - ANTHROPIC_API_KEY"
echo "   - RESEND_API_KEY"
echo ""
echo -e "2. ${BLUE}Start development server:${NC}"
echo "   npm run dev"
echo ""
echo -e "3. ${BLUE}Start Ralph for autonomous backend development:${NC}"
echo "   ralph-start --config ralph.config.json --no-review"
echo ""
echo -e "4. ${BLUE}Monitor Ralph progress:${NC}"
echo "   ralph-monitor --live"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
