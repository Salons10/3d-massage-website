---
name: designing-ui-ux-pro-max
description: "Provides design intelligence for building professional UI/UX. Generates industry-specific design systems, color palettes, and typography pairings. Use when the user requests UI design, landing pages, dashboards, or design system generation."
---

# UI/UX Pro Max Design Intelligence

## When to use this skill
- When building a new landing page, dashboard, or mobile app UI.
- When the user asks for design recommendations, color palettes, or typography pairings.
- When generating a professional design system from scratch.

## Workflow

### 1. Design System Generation
Follow this pattern before implementing any UI:
- [ ] **Analyze Requirements**: Identify product category (SaaS, Fintech, Healthcare, etc.).
- [ ] **Generate System**: Run the reasoning engine to get patterns, styles, and colors.
- [ ] **Persist Master**: Save the design system to `design-system/MASTER.md`.
- [ ] **Define Overrides**: (Optional) Create page-specific overrides in `design-system/pages/`.

### 2. Implementation & Validation
- [ ] **Apply Styles**: Implement code using the generated design tokens.
- [ ] **Check Anti-Patterns**: Verify against the industry-specific "Avoid" list.
- [ ] **Pre-Delivery Checklist**:
    - [ ] No emojis as icons (use SVG).
    - [ ] Smooth transitions (250ms).
    - [ ] Responsive states (Mobile/Tablet/Desktop).
    - [ ] Accessibility (Contrast 4.5:1 min).

## Instructions

### Running the Reasoning Engine
Assume `python3` is available. Use the migrated search script for complex recommendations:

```bash
# Generate industry-specific system
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "saas dashboard" --design-system

# Find specific styles or typography
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
```

### Design Principles (The "Pro Max" Way)
*   **Hierarchical Retrieval**: Always read `design-system/MASTER.md` first. If working on a specific page, check for a corresponding file in `design-system/pages/`.
*   **No Placeholders**: Never use generic colors or "lorem ipsum". Use the `generate_image` tool if visuals are needed.
*   **Accessibility First**: Every design system generated must prioritize WCAG AA compliance.

## Resources
- [Reasoning Engine](scripts/search.py)
- [Design Data](resources/data/)
