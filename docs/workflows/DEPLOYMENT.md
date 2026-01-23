# Workflow: Deployment Checklist

This document ensures safe and consistent deployments to the Evolution 4.0 production environment.

---

## 1. Pre-Deployment Checks

- [ ] **Build Check**: `npm run build` must pass locally without warnings.
- [ ] **Linting**: `npm run lint` must be clean.
- [ ] **Type Safety**: `npx tsc --noEmit` must pass.
- [ ] **Lighthouse**: Verify that the Home page maintains >90 in all categories.
- [ ] **SEO**: Ensure `robots.txt` and `sitemap.xml` are generating correctly.

## 2. Environment Variables

Ensure the following are set in the Vercel Production Dashboard:
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID.
- `NEXT_PUBLIC_API_URL`: Backend API URL.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID.
- `NEXTAUTH_SECRET`: Secret for session encryption.
- `DATABASE_URL`: (Phase 2) Connection string for Supabase.

## 3. Deployment Sequence

1. **Vercel Preview**: Every PR generates a preview URL. Stakeholders must review this.
2. **Merge to main**: Merging to the `main` branch triggers the production build.
3. **Smoke Test**: Immediately after deployment, verify:
   - SSL certificate is active.
   - All 5 core pages load.
   - Email capture form works.
   - Analytics events are firing.

## 4. Rollback Procedure

In case of critical failure:
1. Go to the Vercel **Deployments** tab.
2. Identify the last "Ready" deployment before the failure.
3. Click "Promote to Production".
4. Deployment will be restored in seconds.
