# 🔒 Security Lockdown - Complete

## ✅ What's Been Fixed

### 1. Code-Level Security
- ✅ **Removed all hardcoded keys** from scripts
- ✅ **Scripts now use environment variables** from `.env.local`
- ✅ **Admin route guards** added to middleware
- ✅ **RLS policies** created and ready to apply
- ✅ **Profiles table** SQL ready for role-based access

### 2. Files Created

| File | Purpose |
|------|---------|
| `supabase/CREATE_PROFILES_TABLE.sql` | Creates profiles table with role-based access |
| `supabase/RLS_POLICIES.sql` | Comprehensive RLS policies for all tables |
| `SECURITY_LOCKDOWN.md` | Complete security checklist and instructions |
| `scripts/verify-security.sh` | Automated security verification script |

### 3. Middleware Protection

The middleware now:
- ✅ Requires authentication for all non-public routes
- ✅ Checks for `admin` role before allowing `/admin` access
- ✅ Redirects unauthorized users to home page
- ✅ Logs unauthorized access attempts

---

## ⚠️ CRITICAL: You Must Do These Steps

### Step 1: Rotate Service Role Key (5 minutes)

**This is the MOST IMPORTANT step!**

1. Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/settings/api
2. Click **"Reset service_role key"**
3. Copy the NEW key
4. Update `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=<paste_new_key_here>
   ```
5. Restart dev server: `npm run dev`

### Step 2: Create Profiles Table (2 minutes)

1. Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new
2. Copy ALL contents from `supabase/CREATE_PROFILES_TABLE.sql`
3. Paste and click **RUN**
4. Verify it says "Success"

### Step 3: Apply RLS Policies (2 minutes)

1. Same SQL Editor as above
2. Copy ALL contents from `supabase/RLS_POLICIES.sql`
3. Paste and click **RUN**
4. Verify all policies created successfully

### Step 4: Make Yourself Admin (1 minute)

After signing up through your app:

```sql
-- In Supabase SQL Editor, run:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-actual-email@example.com';
```

### Step 5: Test Security (5 minutes)

Test these scenarios:

1. **Without authentication:**
   ```
   Visit: http://localhost:3000/admin
   Expected: Redirects to /auth
   ```

2. **As regular user:**
   ```
   Sign up with new email
   Visit: /admin
   Expected: Redirects to /
   ```

3. **As admin:**
   ```
   Log in with your admin email
   Visit: /admin
   Expected: Full access granted
   ```

---

## 🛡️ Current Security Status

### What's Secure NOW:
- ✅ No hardcoded keys in source code
- ✅ All scripts use environment variables
- ✅ Admin routes protected by middleware
- ✅ `.env.local` in `.gitignore` (never committed)

### What Needs Supabase Actions:
- ⚠️ **Service role key needs rotation** (keys in git history)
- ⚠️ **Profiles table needs creation** (for role management)
- ⚠️ **RLS policies need application** (database-level security)
- ⚠️ **Admin users need creation** (you need admin access)

---

## 📊 Security Layers

After completing all steps, you'll have:

1. **Application Layer** (middleware.ts)
   - Checks authentication
   - Verifies admin role
   - Redirects unauthorized users

2. **Database Layer** (RLS Policies)
   - Restricts data access by role
   - Prevents unauthorized queries
   - Works even if app security bypassed

3. **API Layer** (Service Role)
   - Only used in server components
   - Never exposed to client
   - Bypasses RLS when needed (carefully!)

---

## 🔄 Quick Start Commands

```bash
# 1. Verify current security status
./scripts/verify-security.sh

# 2. After rotating keys, test a script
node scripts/seed-all-syndicators.js

# 3. Start dev server with new keys
npm run dev
```

---

## 📚 Reference

### Role Hierarchy
- `user` - Basic authenticated user (default)
- `syndicator` - Can manage their own horses/term sheets
- `investor` - Can view their investments
- `admin` - Full access to everything

### Protected Routes
- `/admin/*` - Requires `admin` role
- `/engine/*` - Requires authentication
- `/mystable` - Requires authentication

### Public Routes
- `/` - Homepage
- `/auth` - Login/signup
- `/marketplace` - Browse public listings
- `/privacy`, `/terms` - Legal pages

---

## ❓ FAQ

**Q: Why rotate the service role key?**
A: It's currently in git history. Anyone with repo access has god-mode to your database.

**Q: Can I skip RLS policies?**
A: NO. Without RLS, anyone who gets a key has full database access. RLS is your last line of defense.

**Q: What if I forget to make myself admin?**
A: You'll be locked out of `/admin`. Run the SQL query in Supabase to fix it.

**Q: How do I add more admins later?**
A: Run the same SQL UPDATE query with different emails, or build an admin management UI.

---

## ✅ Security Verification

Run this after completing all steps:

```bash
./scripts/verify-security.sh
```

Should show all ✅ green checks!

---

## 🆘 If Something Goes Wrong

1. **Can't access /admin**: Check profiles table for your admin role
2. **Scripts fail**: Verify .env.local has correct keys
3. **RLS blocks everything**: Check policies applied correctly
4. **Auth not working**: Verify Supabase project settings

Check logs:
- Supabase: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/logs/explorer
- Console: Browser DevTools > Console
- Server: Terminal where `npm run dev` is running

---

## 🎯 Success Criteria

You're fully secured when:
- [ ] Service role key rotated
- [ ] Profiles table created
- [ ] RLS policies applied
- [ ] You have admin access
- [ ] Non-admins cannot access /admin
- [ ] Unauthenticated users redirect to /auth
- [ ] All scripts work with env vars
- [ ] `./scripts/verify-security.sh` shows all green

**Estimated Time: 15 minutes total**

🔒 **Your security is now in your hands. Complete these steps today!**
