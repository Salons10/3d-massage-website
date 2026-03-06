---
name: polishing-website-quality
description: >
  Systematic UI/UX audit and fix pass covering design quality, bugs, mobile
  responsiveness, image optimization, and layout issues. Use when the user asks
  to polish, fix, audit, or optimize a website's visual quality, or before deployment.
---

# Polishing Website Quality

Systematic audit-and-fix pass that transforms a working website into a **polished, production-ready** product. Covers design, bugs, responsiveness, images, and interactions.

**Pipeline position:** Runs AFTER `building-website-from-blueprint` and BEFORE `seo-content-optimization`.

## When to Use This Skill

- User says "polish the site", "fix the design", or "make it production-ready"
- User reports visual bugs, mobile issues, or layout problems
- A website build is complete and needs QA before SEO/deployment
- User asks for a "UI/UX audit" or "design review"

## Workflow

```markdown
- [ ] Run visual audit at 4 breakpoints (375, 768, 1024, 1440px)
- [ ] Catalog all issues by priority (Critical / High / Low)
- [ ] Fix Critical issues (layout breaks, overflow, invisible content)
- [ ] Fix High issues (spacing, alignment, color consistency)
- [ ] Optimize images (compression, lazy loading, proper srcset)
- [ ] Polish interactions (hover states, transitions, scroll behavior)
- [ ] Fix Low issues (micro-alignment, icon consistency)
- [ ] Final verification pass at all breakpoints
```

---

## Step 1: Visual Audit

Use the **browser tool** to screenshot the site at each breakpoint:

| Breakpoint | Device | What to Check |
|------------|--------|---------------|
| **375px** | Mobile | Hamburger menu, text overflow, touch targets (44px min), stacked layouts |
| **768px** | Tablet | Grid collapse behavior, image sizing, nav transition |
| **1024px** | Small Desktop | Content width, sidebar behavior, hover states |
| **1440px** | Full Desktop | Max-width containers, ultra-wide spacing, hero proportions |

### Audit Checklist

**Layout & Structure:**
- [ ] No horizontal scroll at any breakpoint
- [ ] All sections have consistent padding/margins
- [ ] Content stays within max-width container
- [ ] Proper spacing between sections (60–100px)
- [ ] Footer stays at bottom of page

**Typography:**
- [ ] Heading hierarchy is visually clear (size decreases H1→H6)
- [ ] Body text is readable (16px min, 1.5+ line-height)
- [ ] No orphaned words in headings
- [ ] Font weights are consistent across similar elements

**Colors & Contrast:**
- [ ] All text passes WCAG AA contrast (4.5:1 body, 3:1 large text)
- [ ] Buttons have visible hover/active states
- [ ] Links are distinguishable from body text
- [ ] Dark text on dark backgrounds (common bug)

**Images:**
- [ ] No broken images (404s)
- [ ] Images are properly sized (not stretched/squished)
- [ ] All `<img>` have descriptive `alt` attributes
- [ ] hero/banner images don't clash with overlay text

**Interactions:**
- [ ] All buttons/links have hover states
- [ ] Smooth transitions (250ms ease)
- [ ] Mobile menu opens/closes properly
- [ ] Scroll behavior is smooth
- [ ] No janky animations or layout shifts

---

## Step 2: Fix by Priority

### Critical (Blocks deployment)
- Content invisible or unreadable at any breakpoint
- Horizontal scrollbar / overflow
- Navigation completely broken on mobile
- White screen / JS errors in console

### High (Noticeable quality issues)
- Inconsistent spacing between sections
- Images not optimized (>500KB for web)
- Missing hover/active states
- Color contrast failures
- Misaligned elements

### Low (Polish items)
- Sub-pixel alignment issues
- Animation timing fine-tuning
- Icon size consistency
- Micro-copy improvements

---

## Step 3: Image Optimization

```markdown
- [ ] Compress all images (target: <200KB for content, <500KB for hero)
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Use proper aspect ratios (prevent layout shift)
- [ ] Verify all generated images match the site's visual style
- [ ] Replace any remaining placeholders with `generate_image` output
```

### Image Best Practices
- Hero images: 1920×1080, JPEG/WebP, <500KB
- Card thumbnails: 600×400, JPEG/WebP, <100KB
- Icons: SVG preferred, PNG fallback at 2x resolution

---

## Step 4: Interaction Polish

Focus areas:
- **Hover states**: Every clickable element needs visible feedback
- **Transitions**: `transition: all 250ms ease` on interactive elements
- **Scroll reveals**: Subtle fade-in on scroll (optional, only if blueprint calls for it)
- **Mobile menu**: Smooth slide/fade, proper overlay, scroll lock on body
- **Focus states**: Visible outline for keyboard navigation

---

## Step 5: Final Verification

Re-run the browser audit at all 4 breakpoints. Confirm:
- [ ] All Critical/High issues resolved
- [ ] Dev server runs clean (no console errors)
- [ ] Page loads feel fast (no blocking resources)
- [ ] Site looks professional and polished at every size

---

## Common Bugs & Fixes

| Bug | Cause | Fix |
|-----|-------|-----|
| Horizontal scroll on mobile | Element wider than viewport | `overflow-x: hidden` on body, find the offending element |
| Text over image unreadable | No overlay or contrast | Add `background: linear-gradient(rgba(0,0,0,0.5), ...)` |
| Layout shift on load | Images without dimensions | Set explicit `width`/`height` or `aspect-ratio` |
| Janky scroll animations | Heavy JS on scroll | Use `IntersectionObserver`, not `scroll` event |
| Button text wrapping | Fixed width too narrow | Use `padding` + `min-width` instead of fixed `width` |
| Z-index wars | Competing stacking contexts | Audit z-index values, use a scale (10, 20, 30, ...) |

## Related Skills

- **Input from:** `building-website-from-blueprint` (the built website)
- **Design compliance:** `designing-ui-ux-pro-max` (verify against design system)
- **Error fixes:** `error-handling-patterns` (if runtime errors found)
- **Output to:** `seo-content-optimization` (next step in pipeline)
