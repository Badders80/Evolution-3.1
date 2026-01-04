# 🔒 Security Lockdown - Quick Reference

## ⚡ 3-Step Security Fix ✅ COMPLETE

### 1️⃣ Rotate Supabase Key (5 min) ✅ DONE
```
→ Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/settings/api
→ Click "Reset service_role key"
→ Copy new key
→ Update .env.local with new key
→ Restart: npm run dev
```

### 2️⃣ Run SQL Setup (5 min) ✅ DONE
```
→ Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new
→ Copy ALL from: supabase/COMPLETE_SECURITY_SETUP.sql
→ Paste and click RUN
→ Verify "Success" message
```
**Status**: Profiles table created with RLS policies applied!

### 3️⃣ Make Yourself Admin (5 min) ✅ DONE
```sql
-- In Supabase SQL Editor:
UPDATE profiles SET role = 'admin' 
WHERE email = 'your@email.com';
```
**Status**: Admin role set for alex@evolutionstables.nz!

## ✅ Test It Works

```bash
# 1. Verify security
./scripts/verify-security.sh

# 2. Test admin access
Visit: http://localhost:3000/admin
Should work if logged in as admin

# 3. Test protection
Log out and visit /admin
Should redirect to /auth
```

## 📁 Files Reference

| File | What It Does |
|------|--------------|
| `supabase/COMPLETE_SECURITY_SETUP.sql` | ⭐ **Run this one!** All-in-one security setup |
| `SECURITY_COMPLETE.md` | Full documentation and troubleshooting |
| `scripts/verify-security.sh` | Check security status anytime |

## 🎯 What Changed

### Before (Insecure):
- ❌ Service role keys in git
- ❌ No RLS policies
- ❌ Anyone could access /admin
- ❌ No role-based access control

### After (Secure): ✅ COMPLETE
- ✅ Keys rotated and only in .env.local
- ✅ RLS policies applied on all tables
- ✅ Middleware protects /admin routes
- ✅ Bank-grade role-based permissions
- ✅ Profiles table with SELECT + UPDATE policies

## 🆘 Common Issues

**Issue**: Can't access /admin
**Fix**: Run admin SQL query again with your email

**Issue**: Scripts failing
**Fix**: Check .env.local has new service role key

**Issue**: RLS blocking everything
**Fix**: Verify SQL ran successfully, check for errors

## 💡 Remember

1. **Never commit .env.local** (already in .gitignore)
2. **Service role = god mode** (only use server-side)
3. **Test with different roles** (user, admin, logged out)
4. **Rotate keys if exposed** (git history counts as exposed)

## 🔐 Security Layers

```
User Request
     ↓
[Middleware] ← Checks auth + role
     ↓
[Server Component] ← Uses service role (careful!)
     ↓
[Supabase RLS] ← Database-level security
     ↓
Data
```

Both layers must pass for access!

---

**🚀 Ready? Start with Step 1 above! ⬆️**

*Questions? Check SECURITY_COMPLETE.md for full details*
