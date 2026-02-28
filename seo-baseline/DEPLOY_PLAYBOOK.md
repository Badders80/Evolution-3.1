# 🏇 Evolution Stables — Deploy Playbook

Purpose: A quick reference for managing staging and production deployments of the Evolution Stables website via Vercel and GitHub.

## ⚙️ Environments

| Environment | URL | Description |
| --- | --- | --- |
| Staging (Preview) | https://evolution-3-1.vercel.app | Automatically built for every branch/PR; use for QA before release. |
| Production (Live) | https://www.evolutionstables.nz | Auto-deployed when `main` updates; this is the public site. |

## 🚀 Deployment Workflow

1. **Create a feature branch**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/update-homepage
   ```
2. **Develop and push changes**
   ```bash
   git add .
   git commit -m "Update homepage layout"
   git push origin feature/update-homepage
   ```
   Vercel provides a preview URL such as `https://evolution-3-1-git-feature-update-homepage.vercel.app` for validation.
3. **Review and test**
   - Check desktop/mobile layouts.
   - Verify links, forms, auth, and asset loading.
   - Confirm environment-specific variables behave correctly.
4. **Merge to production**
   ```bash
   git checkout main
   git merge feature/update-homepage
   git push origin main
   ```
   Vercel builds and deploys `main` to https://www.evolutionstables.nz.
5. **Verify production**
   - Confirm navigation, layout, and login flow.
   - Validate API integrations and DNS resolution.
   - If issues surface, rollout the rollback procedure below.

## ⏪ Rollback Procedure

1. Open Vercel Dashboard → `evolution-3-1` → Deployments.
2. Locate a previous deployment with a green checkmark.
3. Click the ⋮ menu → **Promote to Production** to instantly revert.

## 🔑 Environment Variables

Manage variables in Vercel → Settings → Environment Variables and keep preview/production values consistent with their targets.

## 🧩 Branch Naming

- Features: `feature/<description>`
- Fixes: `fix/<description>`
- Hotfixes: `hotfix/<description>`

Examples: `feature/add-faq-section`, `fix/footer-spacing`, `hotfix/login-redirect`

## 🧭 Quick Reference

| Action | Command / Location | Result |
| --- | --- | --- |
| Create new branch | `git checkout -b feature/<name>` | Starts a staging (preview) build |
| View preview | Vercel auto-generated URL | Test staging deployment |
| Merge to production | Merge into `main` | Pushes live to production |
| Rollback | Vercel → Deployments → Promote old build | Restores previous version |
| Check environment variables | Vercel → Settings → Environment Variables | View/manage credentials |

## ✅ Summary

- Project: `evolution-3-1`
- Repository: `Badders80/evolution-3.1`
- Pipelines: automated previews for branches, automated production deploys from `main`
- No manual uploads—Vercel handles builds and deployments end to end.

## 📜 Version History

| Version | Date | Branch | Summary | Status |
| --- | --- | --- | --- | --- |
| 1.2.3 | 2025-10-10 | feature/update-homepage | New layout and typography | ✅ Live |
| 1.2.2 | 2025-10-05 | fix/footer-spacing | Adjusted footer alignment | ✅ Live |
| 1.2.1 | 2025-10-01 | feature/add-podcast-section | Added podcast teaser block | ✅ Live |
