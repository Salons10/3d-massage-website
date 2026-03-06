---
name: deploying-to-github-vercel
description: >
  End-to-end deployment pipeline from Git init to production on Vercel. Handles
  Git setup, GitHub repo creation, Vercel project linking, environment variables,
  and custom domain configuration. Use when the user wants to deploy, push to
  GitHub, go live, or set up hosting.
---

# Deploying to GitHub + Vercel

End-to-end deployment: **Git init → GitHub push → Vercel deploy → go live**.

**Pipeline position:** This is the FINAL step. Runs AFTER `seo-content-optimization` (and `seo-audit-gate` validation).

## When to Use This Skill

- User says "deploy", "push to GitHub", "go live", or "put it on Vercel"
- Website has passed polishing and SEO optimization
- User wants to set up hosting for a client site
- User asks about domain configuration or environment variables

## Prerequisites

| Requirement | Source |
|-------------|--------|
| Polished, SEO-optimized website | Output from pipeline steps 1–5 |
| Git installed locally | System requirement |
| GitHub MCP tool | Available by default |
| Vercel MCP tool | Available by default |
| `seo-audit-gate` passed | No Critical issues remaining |

## Pre-Deploy Gate

Before deploying, confirm these gates have passed:

```markdown
- [ ] `polishing-website-quality` — No Critical/High issues
- [ ] `seo-content-optimization` — Keywords, meta tags, schema in place
- [ ] `seo-audit-gate` — Structural SEO validated
- [ ] `npm run build` — Builds without errors
- [ ] No console errors in browser
- [ ] No placeholder content remaining
```

---

## Workflow

```markdown
- [ ] Run production build (`npm run build`)
- [ ] Initialize Git repo (if needed)
- [ ] Create .gitignore
- [ ] Commit all files
- [ ] Create GitHub repo via MCP
- [ ] Push to GitHub
- [ ] Create Vercel project and link to repo
- [ ] Configure environment variables (if any)
- [ ] Trigger production deployment
- [ ] Verify live site
- [ ] Configure custom domain (if provided)
```

---

## Step 1: Production Build

```bash
npm run build
```

Verify the build completes without errors. Check the `dist/` directory exists.

---

## Step 2: Git Setup

**If no `.git` exists:**

```bash
git init
```

**Create/verify `.gitignore`:**

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

**Initial commit:**

```bash
git add .
git commit -m "Initial commit: [project-name] website"
```

---

## Step 3: Create GitHub Repository

Use the GitHub MCP tool to create the repo:

```
Tool: create_repository
  name: <project-name>
  description: "<Industry> website for <Client/Business>"
  private: true  (ask user preference)
  auto_init: false  (we already have code)
```

**Then push:**

```bash
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```

---

## Step 4: Vercel Deployment

### Option A: Via Vercel MCP (Preferred)

List existing projects to check for conflicts:
```
Tool: vercel_list_projects
```

If the project doesn't exist, Vercel will auto-detect the framework (Vite) when linked to the GitHub repo. The deployment happens automatically on push.

### Option B: Via Vercel CLI

```bash
npx -y vercel --prod
```

Follow prompts to link to the Vercel account and deploy.

---

## Step 5: Environment Variables

If the project needs env vars (API keys, analytics IDs, etc.):

```
Tool: vercel_create_env_var
  projectId: <project-id>
  key: "VITE_GOOGLE_MAPS_API_KEY"
  value: "<key>"
  target: ["production", "preview"]
  type: "encrypted"
```

Common env vars for service-industry sites:
| Variable | Purpose |
|----------|---------|
| `VITE_GOOGLE_MAPS_API_KEY` | Maps embed |
| `VITE_GA_TRACKING_ID` | Google Analytics |
| `VITE_CONTACT_FORM_ENDPOINT` | Form submission API |

After adding env vars, redeploy:
```
Tool: vercel_redeploy
  deploymentId: <latest-deployment-id>
  target: "production"
```

---

## Step 6: Verify Live Site

Use the browser tool to verify the deployed site:

```markdown
- [ ] Home page loads without errors
- [ ] All images load correctly
- [ ] Mobile responsive (test at 375px)
- [ ] Contact form/CTA works
- [ ] No console errors
- [ ] SSL certificate active (https)
```

---

## Step 7: Custom Domain (Optional)

If the user provides a domain:

1. Add domain in Vercel dashboard (or via API)
2. Provide the user with DNS records to set:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for www subdomain)
3. Wait for DNS propagation (up to 48 hours)
4. Verify SSL certificate is issued

---

## Post-Deploy Checklist

```markdown
- [ ] Live URL shared with user
- [ ] GitHub repo URL shared with user
- [ ] Environment variables documented
- [ ] Custom domain configured (if applicable)
- [ ] Google Analytics / tracking verified (if applicable)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails on Vercel | Check `vite.config.ts` output settings; ensure no hardcoded local paths |
| 404 on routes | Add `vercel.json` with `"rewrites": [{"source": "/(.*)", "destination": "/"}]` |
| Env vars not available | Vite requires `VITE_` prefix for client-side vars; redeploy after adding |
| Images not loading | Check paths — use `/images/...` not `./images/...` for public dir |
| Domain not connecting | DNS propagation takes time; verify records with `dig <domain>` |

## Related Skills

- **Pre-deploy gates:** `polishing-website-quality`, `seo-content-optimization`, `seo-audit-gate`
- **Pipeline start:** `scraping-leads-with-enrichment` → `competitor-research-consulting` → `building-website-from-blueprint`
