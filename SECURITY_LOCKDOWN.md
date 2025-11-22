# 🔒 SECURITY LOCKDOWN CHECKLIST

## CRITICAL: Complete These Steps Immediately

### ✅ Step 1: Clean Code (COMPLETED)
- [x] Removed hardcoded service role keys from all scripts
- [x] Updated scripts to use environment variables from .env.local
- [x] Added admin route guards to middleware
- [x] Created comprehensive RLS policies

### 🔄 Step 2: Rotate All Keys (DO THIS NOW)

#### A. Rotate Supabase Service Role Key
1. Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/settings/api
2. Click "Reset service_role key"
3. Copy the NEW service role key
4. Update `/home/evo/Evolution-3.1/.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=<new_key_here>
   ```
5. **IMPORTANT**: Never commit this file to git

#### B. Rotate Supabase Anon Key (If Compromised)
1. Same settings page as above
2. Click "Reset anon key" 
3. Copy the NEW anon key
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<new_anon_key_here>
   ```

#### C. Update Environment Variables
After rotating keys, restart your development server:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 🛡️ Step 3: Apply RLS Policies

1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new
2. Open `/supabase/RLS_POLICIES.sql` in this project
3. Copy the entire file contents
4. Paste into SQL Editor
5. Click "Run" to apply all policies

### 👥 Step 4: Create Admin Users

You need to set up admin users who can access /admin routes:

```sql
-- Run this in Supabase SQL Editor for each admin user

-- First, get the user's ID (replace with actual email)
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then insert into profiles with admin role
INSERT INTO profiles (id, email, role, full_name)
VALUES (
  '<user_id_from_above>', 
  'your-email@example.com',
  'admin',
  'Your Name'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### 🔍 Step 5: Verify Security

Test these scenarios:

1. **Unauthenticated Access**
   - Visit http://localhost:3000/admin
   - Should redirect to /auth

2. **Non-Admin Access**
   - Log in as regular user
   - Try to access /admin
   - Should redirect to /

3. **Admin Access**
   - Log in as admin user
   - Access /admin
   - Should work normally

4. **API Security**
   - Test that non-admins cannot call admin API routes
   - Test that RLS policies prevent unauthorized data access

### 📋 Step 6: Ongoing Security Practices

#### Never Commit These Files:
- `.env.local` ✅ (already in .gitignore)
- `.env`
- Any file with "SECRET" or "KEY" in the name

#### Use Environment Variables Everywhere:
```typescript
// ✅ GOOD
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ❌ BAD
const key = 'eyJhbGc...';
```

#### Server-Side Only for Service Role:
```typescript
// ✅ GOOD - Server component or API route
import { supabaseServer } from '@/lib/supabaseServer';

// ❌ BAD - Client component
'use client';
import { supabaseServer } from '@/lib/supabaseServer';
```

#### Regular Security Audits:
- Review RLS policies monthly
- Check for exposed keys in git history
- Monitor Supabase logs for suspicious activity
- Keep dependencies updated

### 🚨 If Keys Were Already Committed to Git

Your keys ARE in git history. You MUST rotate them:

1. Rotate all keys (Steps 2A, 2B above)
2. Remove sensitive files from git history:
```bash
# This rewrites git history - use with caution
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch scripts/*.js" \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (recommended):
# https://rtyley.github.io/bfg-repo-cleaner/
```
3. Force push (if you must):
```bash
git push origin --force --all
```

### ✅ Security Checklist

- [ ] Service role key rotated
- [ ] Anon key checked/rotated if needed
- [ ] .env.local updated with new keys
- [ ] RLS policies applied in Supabase
- [ ] Admin users created in profiles table
- [ ] Tested unauthenticated access (blocked)
- [ ] Tested non-admin access (blocked)
- [ ] Tested admin access (works)
- [ ] Development server restarted
- [ ] Verified no secrets in git history

## Current Status

### What's Protected Now:
✅ Scripts use environment variables
✅ Admin routes require authentication + admin role
✅ RLS policies ready to apply
✅ Service role key only in .env.local (gitignored)

### What You Need to Do:
⚠️ **ROTATE SERVICE ROLE KEY** (most critical)
⚠️ Apply RLS policies in Supabase
⚠️ Create admin users in profiles table
⚠️ Test all authentication flows

## Support

If you see any security issues or have questions:
1. Check Supabase logs: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/logs/explorer
2. Review this checklist
3. Test with different user roles
4. Monitor for unauthorized access attempts
