---
name: stitch-loop
description: "Iteratively builds full websites using Stitch via an autonomous baton-passing pattern. Handles page generation, integration, and roadmap management."
---

# Stitch Build Loop

## When to use this skill
- When building a multi-page website from scratch or a high-level roadmap.
- To maintain an autonomous development cycle between "baton" prompts.

## Workflow

### 1. Preparation
- [ ] **Context**: Read `SITE.md` (roadmap) and `DESIGN.md` (system).
- [ ] **Read Baton**: Parse `next-prompt.md` for the current page and prompt.

### 2. Execution
- [ ] **Generate**: Call `generate_screen_from_text` with context-aware prompts.
- [ ] **Asset Transfer**: Save HTML/PNG to `queue/`.
- [ ] **Integration**: Move HTML to `site/public/`, fix assets, and wire navigation.
- [ ] **Verification**: Capture screenshot via Chrome DevTools (if available) for fidelity check.

### 3. Continuum
- [ ] **Update Sitemap**: Mark completed page in `SITE.md`.
- [ ] **Pass Baton**: Update `next-prompt.md` with the next task from the roadmap.

## Instructions

### The Baton System
*   The `next-prompt.md` file is the source of truth for the current iteration. Always include the required design block from `DESIGN.md`.
*   **Never Stall**: Always leave a task for the next iteration in the baton file.

### Site Hygiene
*   **Relative Wiring**: Replace placeholder links (`#`) with real relative paths to other generated pages.
*   **Sitemap Control**: Consult `SITE.md` Section 4 to prevent page duplication.

## Resources
- [Prompting Guide](https://stitch.withgoogle.com/docs/learn/prompting/)
