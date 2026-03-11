#!/bin/bash
# Publish script for perfect-text-overlay

set -e

echo "🚀 Publishing perfect-text-overlay to npm..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if already logged in
echo "📋 Step 1: Checking npm login status..."
if npm whoami > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Already logged in as: $(npm whoami)${NC}"
else
    echo -e "${YELLOW}⚠ Not logged in to npm${NC}"
    echo ""
    echo "Please login to npm:"
    npm login
fi

echo ""
echo "📦 Step 2: Validating package..."

# Check package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json not found${NC}"
    exit 1
fi

# Show what will be published
echo ""
echo "Files to be published:"
npm pack --dry-run 2>&1 | grep -E "^-|Tarball Contents" || true

echo ""
echo "📊 Package info:"
echo "  Name: $(node -p "require('./package.json').name")"
echo "  Version: $(node -p "require('./package.json').version")"
echo "  Size: $(npm pack --dry-run 2>&1 | grep "package size:" | cut -d: -f2 | xargs)"

echo ""
read -p "Do you want to publish? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    echo ""
    echo "🚀 Publishing..."
    npm publish --access public
    
    echo ""
    echo -e "${GREEN}✅ Published successfully!${NC}"
    echo ""
    echo "📦 Package URL:"
    echo "  https://www.npmjs.com/package/$(node -p "require('./package.json').name")"
    echo ""
    echo "🎉 You can now create Granular Access Token with this package."
else
    echo ""
    echo "❌ Publish cancelled"
    exit 0
fi
