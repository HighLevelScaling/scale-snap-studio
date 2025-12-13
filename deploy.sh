#!/bin/bash

# ============================================================================
# Scale-Snap-Studio Deployment Script
# ============================================================================
# This script deploys all the scalability and performance improvements
# including database migrations, Edge Functions, and frontend build.
#
# Prerequisites:
# - Supabase CLI installed (https://supabase.com/docs/guides/cli)
# - Node.js and npm installed
# - Supabase project initialized
# ============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}============================================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# ============================================================================
# Step 1: Pre-deployment Checks
# ============================================================================
print_header "Step 1: Pre-deployment Checks"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_error "Supabase CLI is not installed"
    echo "Install it with: npm install -g supabase"
    exit 1
fi
print_success "Supabase CLI is installed"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_success "Node.js is installed ($(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm is installed ($(npm --version))"

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the project root?"
    exit 1
fi
print_success "In correct project directory"

# ============================================================================
# Step 2: Install Dependencies
# ============================================================================
print_header "Step 2: Installing Dependencies"

print_info "Running npm install..."
npm install

# Check if date-fns is installed (required for the new components)
if ! npm list date-fns &> /dev/null; then
    print_warning "date-fns not found, installing..."
    npm install date-fns
fi
print_success "All dependencies installed"

# ============================================================================
# Step 3: Supabase Login
# ============================================================================
print_header "Step 3: Supabase Authentication"

print_info "Checking Supabase login status..."
if ! supabase projects list &> /dev/null; then
    print_warning "Not logged in to Supabase"
    print_info "Please log in to Supabase..."
    supabase login
else
    print_success "Already logged in to Supabase"
fi

# ============================================================================
# Step 4: Link Supabase Project
# ============================================================================
print_header "Step 4: Link Supabase Project"

print_info "Checking if project is linked..."
if [ ! -f ".supabase/config.toml" ]; then
    print_warning "Project not linked to Supabase"
    echo ""
    echo "Available projects:"
    supabase projects list
    echo ""
    read -p "Enter your project reference ID: " PROJECT_REF
    supabase link --project-ref "$PROJECT_REF"
    print_success "Project linked successfully"
else
    print_success "Project already linked"
fi

# ============================================================================
# Step 5: Database Migration
# ============================================================================
print_header "Step 5: Database Migration"

print_info "Applying database migrations..."
if [ -d "supabase/migrations" ]; then
    supabase db push
    print_success "Database migrations applied successfully"
    
    print_info "Verifying tables were created..."
    echo "You can verify in your Supabase dashboard that these tables exist:"
    echo "  - workflows"
    echo "  - activity_log"
    echo "  - conversations"
else
    print_error "No migrations directory found"
    exit 1
fi

# ============================================================================
# Step 6: Deploy Edge Functions
# ============================================================================
print_header "Step 6: Deploy Edge Functions"

if [ -d "supabase/functions" ]; then
    print_info "Deploying execute-workflow function..."
    supabase functions deploy execute-workflow --no-verify-jwt
    print_success "execute-workflow deployed"
    
    print_info "Deploying trigger-workflow function..."
    supabase functions deploy trigger-workflow --no-verify-jwt
    print_success "trigger-workflow deployed"
    
    print_info "Edge Functions deployed successfully"
    echo ""
    print_warning "Important: Set the following environment variables in your Supabase dashboard:"
    echo "  1. Go to: Project Settings > Edge Functions"
    echo "  2. Add these secrets:"
    echo "     - SUPABASE_URL (your project URL)"
    echo "     - SUPABASE_SERVICE_ROLE_KEY (from Project Settings > API)"
else
    print_error "No functions directory found"
    exit 1
fi

# ============================================================================
# Step 7: Build Frontend
# ============================================================================
print_header "Step 7: Build Frontend Application"

print_info "Running production build..."
npm run build
print_success "Frontend build completed"

print_info "Build artifacts created in: dist/"

# ============================================================================
# Step 8: Test Build Locally (Optional)
# ============================================================================
print_header "Step 8: Local Preview (Optional)"

echo ""
read -p "Would you like to preview the build locally? (y/n): " PREVIEW_CHOICE

if [ "$PREVIEW_CHOICE" = "y" ] || [ "$PREVIEW_CHOICE" = "Y" ]; then
    print_info "Starting preview server..."
    print_info "Press Ctrl+C to stop the server when done testing"
    echo ""
    npm run preview
fi

# ============================================================================
# Deployment Complete
# ============================================================================
print_header "Deployment Complete!"

echo ""
print_success "All components deployed successfully!"
echo ""
echo "Deployment Summary:"
echo "  ✓ Dependencies installed"
echo "  ✓ Database migrations applied"
echo "  ✓ Edge Functions deployed"
echo "  ✓ Frontend build completed"
echo ""
print_info "Next Steps:"
echo "  1. Verify Edge Function environment variables in Supabase dashboard"
echo "  2. Test the application in your browser"
echo "  3. Check Supabase logs for any errors"
echo "  4. Deploy the 'dist/' folder to your hosting provider"
echo ""
print_info "Useful Commands:"
echo "  - View Edge Function logs: supabase functions logs execute-workflow"
echo "  - View database: supabase db remote"
echo "  - Test locally: npm run dev"
echo ""
print_success "Happy deploying! 🚀"
echo ""
