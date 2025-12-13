# Deployment Commands - Copy & Paste Ready

This document contains all deployment commands ready to copy and paste.

## Quick Deployment (Automated Script)

```bash
# Make the script executable (if not already)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

---

## Manual Deployment (Step-by-Step)

If you prefer to run commands manually, follow these steps:

### 1. Install Dependencies

```bash
# Install all npm dependencies
npm install

# Ensure date-fns is installed (required for new components)
npm install date-fns
```

### 2. Supabase Login

```bash
# Login to Supabase (if not already logged in)
supabase login

# List your projects
supabase projects list
```

### 3. Link Your Supabase Project

```bash
# Link to your Supabase project (replace with your project ref)
supabase link --project-ref YOUR_PROJECT_REF_HERE

# Example:
# supabase link --project-ref ubvcefhgxvrpoujjjhee
```

### 4. Apply Database Migrations

```bash
# Push database migrations to create tables
supabase db push

# Verify the migration
supabase db remote ls
```

### 5. Deploy Edge Functions

```bash
# Deploy execute-workflow function
supabase functions deploy execute-workflow --no-verify-jwt

# Deploy trigger-workflow function
supabase functions deploy trigger-workflow --no-verify-jwt

# List deployed functions
supabase functions list
```

### 6. Set Edge Function Environment Variables

**Important**: Set these in your Supabase Dashboard:

1. Go to: **Project Settings → Edge Functions → Manage Secrets**
2. Add these secrets:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

You can find these values in: **Project Settings → API**

### 7. Build the Frontend

```bash
# Run production build
npm run build

# Preview the build locally (optional)
npm run preview
```

### 8. Deploy to Hosting

```bash
# The build output is in the 'dist/' folder
# Deploy this folder to your hosting provider

# For Vercel:
vercel --prod

# For Netlify:
netlify deploy --prod --dir=dist

# For manual upload:
# Upload the contents of the 'dist/' folder to your web server
```

---

## Verification Commands

### Verify Database Tables

```bash
# Connect to remote database
supabase db remote

# In the SQL editor, run:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('workflows', 'activity_log', 'conversations');
```

### Verify Edge Functions

```bash
# List all deployed functions
supabase functions list

# View logs for execute-workflow
supabase functions logs execute-workflow

# View logs for trigger-workflow
supabase functions logs trigger-workflow

# Test execute-workflow function
curl -i --location --request POST \
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/execute-workflow' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"workflowId":"WORKFLOW_UUID_HERE"}'
```

### Verify Frontend Build

```bash
# Check build size
du -sh dist/

# List build files
ls -lh dist/assets/

# Start local preview server
npm run preview
```

---

## Troubleshooting Commands

### Database Issues

```bash
# Reset database (WARNING: This will delete all data)
supabase db reset

# View migration history
supabase migration list

# Create a new migration
supabase migration new migration_name
```

### Edge Function Issues

```bash
# View real-time logs
supabase functions logs execute-workflow --follow

# Delete and redeploy a function
supabase functions delete execute-workflow
supabase functions deploy execute-workflow --no-verify-jwt

# Test function locally
supabase functions serve execute-workflow
```

### Build Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

---

## Environment Variables Reference

### Required in Supabase Edge Functions

```bash
SUPABASE_URL=https://ubvcefhgxvrpoujjjhee.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Required in Frontend (.env file)

These should already be in your `.env` file:

```bash
VITE_SUPABASE_PROJECT_ID=ubvcefhgxvrpoujjjhee
VITE_SUPABASE_URL=https://ubvcefhgxvrpoujjjhee.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Post-Deployment Testing

### Test Real-Time Updates

```bash
# Open two browser windows to your deployed app
# In one window, click "Run Now" on a workflow
# In the other window, watch for real-time updates in:
#   - Workflow Preview component
#   - Recent Activity feed
```

### Test Workflow Execution

```bash
# Using curl to trigger a workflow
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/trigger-workflow \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "trigger": "Form Submission",
    "metadata": {
      "contactName": "Test User",
      "contactInitials": "TU"
    }
  }'
```

### Check Performance

```bash
# Run Lighthouse audit
npx lighthouse https://your-deployed-url.com --view

# Check bundle sizes
npm run build -- --mode production
ls -lh dist/assets/
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./deploy.sh` | Run full automated deployment |
| `supabase db push` | Apply database migrations |
| `supabase functions deploy FUNCTION_NAME` | Deploy an Edge Function |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `supabase functions logs FUNCTION_NAME` | View Edge Function logs |
| `supabase db remote` | Connect to remote database |

---

## Support

If you encounter issues:

1. Check Supabase Dashboard → Logs
2. Check Edge Function logs: `supabase functions logs FUNCTION_NAME`
3. Check browser console for frontend errors
4. Review `IMPLEMENTATION_NOTES.md` for detailed documentation

---

**Ready to deploy? Run `./deploy.sh` or follow the manual steps above!** 🚀
