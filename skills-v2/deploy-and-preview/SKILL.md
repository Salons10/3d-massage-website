---
name: deploy-and-preview
description: >
  End-to-end deployment with screenshot preview for Telegram approval.
  Captures full-page screenshot, generates design rationale, waits for
  explicit approval, then deploys via GitHub + Vercel MCPs (with CLI fallback).
  Tracks project in Supabase. Use when deploying, going live, or when the
  Telegram bot pipeline reaches the preview/deploy phase.
---

# Deploy & Preview

**Screenshot → Design Rationale → Telegram Preview → Approval Gate → Deploy → Verify → Track**.

**Pipeline position:** This is the FINAL step. Runs AFTER `quality-seo-gate` has passed.

## When to Use This Skill

- User says "deploy", "go live", "push it", or "show me the preview"
- Telegram bot pipeline reaches preview/deploy phase
- `quality-seo-gate` has passed — site is ready
- User wants to see a screenshot before committing to deploy

## Prerequisites

| Requirement | Source |
|-------------|--------|
| Quality gate passed | `quality-seo-gate` QUALITY_REPORT.md shows ✅ PASSED |
| Git installed | System requirement |
| GitHub MCP | Available by default |
| Vercel MCP | Available by default |
| Dev server running | `npm run dev` on localhost |
| Supabase MCP | For project tracking |

## Pre-Deploy Gate

```markdown
- [ ] `quality-seo-gate` — PASSED (no Critical issues)
- [ ] `npm run build` — Builds without errors
- [ ] No console errors in browser
- [ ] No placeholder content remaining
- [ ] All generated images loaded correctly
```

> ❌ **DO NOT DEPLOY** if the quality gate hasn't passed. Send the user back to `quality-seo-gate` first.

## Workflow

```markdown
- [ ] Verify quality gate is passed
- [ ] Run production build (npm run build)
- [ ] Capture full-page screenshot (headless browser)
- [ ] Generate design rationale summary
- [ ] Send screenshot + rationale to user (or Telegram bot)
- [ ] WAIT FOR EXPLICIT APPROVAL — do not proceed without "yes"/"deploy it"
- [ ] On approval: create GitHub repo (MCP or CLI fallback)
- [ ] Push code to GitHub
- [ ] Deploy to Vercel (MCP or CLI fallback)
- [ ] Verify live deployment (logo, forms, mobile, speed)
- [ ] Record project in Supabase "projects" table
- [ ] Send live URL + verification report to user
```

---

## Step 1: Production Build

```bash
npm run build
```

Verify `dist/` directory exists and build completed without errors.

---

## Step 2: Capture Screenshot

Use a headless browser approach to capture the full page:

### Option A: Browser Tool
Use the browser tool to navigate to `localhost:5173` (or wherever dev server is running) and take a full-page screenshot.

### Option B: Puppeteer Script (if available)
```bash
# If a capture script exists:
node capture-preview.js --url http://localhost:5173 --output preview.png --full-page
```

**Save screenshot to:** `~/dt-creative/clients/{project-name}/preview.png`

---

## Step 3: Generate Design Rationale

Write a concise summary of the design decisions. This is sent alongside the screenshot so the user (or Telegram) understands **why** the site looks the way it does.

### Template:

```markdown
🖥️ Website Preview: {Business Name}

[SCREENSHOT ATTACHED]

Design Summary:
━━━━━━━━━━━━━━━
• Hero: {description of hero — background, headline approach, CTA placement}
  → Why: {rationale based on competitor research patterns}

• Layout: {section order and spacing approach}
  → Why: {what competitor data showed works best}

• Colors: {palette used and why}
  → Why: {industry alignment, brand colors, conversion psychology}

• Key Features: {highlight 2-3 standout elements}
  → Why: {competitive gap exploited or proven pattern applied}

• Mobile: {confirm responsive behavior}

• SEO: Title tag, schema, local signals all optimized ✅

━━━━━━━━━━━━━━━
✅ Approve to deploy?
✏️ Or tell me what to change.
```

---

## Step 4: Approval Gate

> ⚠️ **CRITICAL RULE: NEVER deploy without explicit approval.**

Wait for the user to respond with one of:
- **Approve:** "yes", "deploy it", "looks good", "go", "approved", "ship it" → proceed to Step 5
- **Changes:** any feedback → go back to `website-builder` or `quality-seo-gate` to make edits, then re-capture screenshot
- **Cancel:** "stop", "cancel", "not now" → save project state, don't deploy

**If in Telegram bot pipeline:** The bot sends the preview and waits. Sebastian replies. Bot parses intent.

---

## Step 5: Create GitHub Repository

### Primary: GitHub MCP

```
Tool: create_repository
  name: {project-name}
  description: "{Industry} website for {Business Name}"
  private: true
  auto_init: false
```

### 🔄 Fallback: Git CLI

If GitHub MCP is unavailable:

```bash
# User must have GitHub CLI installed, or use HTTPS auth
git init
git add .
git commit -m "Initial commit: {project-name} website"
git remote add origin https://github.com/{owner}/{repo}.git
git branch -M main
git push -u origin main
```

**Notify user:** "⚠️ GitHub MCP unavailable — used CLI. Verify repo at github.com/{owner}/{repo}"

---

## Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial commit: {project-name} website"
git remote add origin https://github.com/{owner}/{repo}.git
git branch -M main
git push -u origin main
```

---

## Step 7: Deploy to Vercel

### Primary: Vercel MCP

List existing to check conflicts:
```
Tool: vercel_list_projects
```

If project doesn't exist, Vercel auto-detects Vite framework when linked to GitHub. Deployment triggers on push.

If manual trigger needed:
```
Tool: vercel_list_deployments
  projectId: {project-name}
```

### 🔄 Fallback: Vercel CLI

If Vercel MCP is unavailable:

```bash
npx -y vercel --prod
```

Follow prompts. Link to Vercel account.

**Notify user:** "⚠️ Vercel MCP unavailable — deployed via CLI."

---

## Step 8: Verify Live Deployment

Use the browser tool to check the deployed URL:

```markdown
- [ ] Home page loads without errors
- [ ] Logo/images load correctly — ⚠️ COMMON ISSUE: verify paths
- [ ] Mobile responsive (test at 375px viewport)
- [ ] Contact form / CTA buttons work
- [ ] No console errors
- [ ] SSL certificate active (https://)
- [ ] Page speed acceptable (target: 90+ Lighthouse)
- [ ] Phone number is clickable on mobile
```

### Common Deploy Issues

| Problem | Solution |
|---------|----------|
| Logo missing | Check image paths — use `/images/...` not `./images/...` |
| Build fails on Vercel | Check `vite.config.ts`, ensure no hardcoded local paths |
| 404 on routes | Add `vercel.json`: `{"rewrites": [{"source": "/(.*)", "destination": "/"}]}` |
| Env vars not available | Vite needs `VITE_` prefix; redeploy after adding |
| Images not loading | Path issue — public dir files use `/filename`, not `./filename` |

---

## Step 9: Record in Supabase

Insert project into the `projects` table:

```sql
INSERT INTO projects (
  niche, business_name, site_url, vercel_deployment_id,
  github_repo, status, config, created_at
) VALUES (
  '{niche}', '{business_name}', '{live_url}', '{deployment_id}',
  '{github_repo_url}', 'deployed', '{site_config_json}', NOW()
);
```

---

## Step 10: Send Final Report

```markdown
🚀 Deployed!

Live URL: {live_url}
GitHub: {github_repo_url}

✅ Verification:
• Logo loads: ✅
• Forms working: ✅
• Mobile responsive: ✅
• Page speed: {score}/100
• SSL active: ✅
• Console errors: None ✅

📊 Tracked in Supabase: project #{id}

Want me to:
• Set up a custom domain?
• Start an email outreach campaign for this niche?
• Generate a client delivery email?
```

---

## Step 11: Custom Domain (Optional)

If user provides a domain:

1. Add domain in Vercel dashboard (or via API)
2. Provide DNS records:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for www)
3. Wait for DNS propagation (up to 48 hours)
4. Verify SSL certificate issued

---

## Environment Variables (if needed)

```
Tool: vercel_create_env_var
  projectId: {project-id}
  key: "VITE_GOOGLE_MAPS_API_KEY"
  value: "{key}"
  target: ["production", "preview"]
  type: "encrypted"
```

After adding, redeploy:
```
Tool: vercel_redeploy
  deploymentId: {latest-id}
  target: "production"
```

## Related Skills

- **Pre-deploy gates:** `quality-seo-gate` (must pass before this skill runs)
- **Full pipeline:** `lead-generation` → `competitor-research` → `website-builder` → `quality-seo-gate` → **deploy-and-preview**
