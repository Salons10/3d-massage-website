---
name: stitch-integrating-shadcn-ui
description: "Expert guidance for building React apps with shadcn/ui and Stitch. Manages component discovery, installation, and theme customization."
---

# shadcn/ui Integration

## When to use this skill
- When adding shadcn/ui components to a project.
- When customizing shadcn themes or building complex patterns with the library.

## Workflow

### 1. Setup & Discovery
- [ ] **Initial Config**: Ensure `components.json` and `cn()` utility are present.
- [ ] **Discovery**: Browse components via the shadcn registry or documentation.

### 2. Component Management
- [ ] **Installation**: Use the CLI to add components (e.g., `npx shadcn@latest add button`).
- [ ] **Architectural Fit**: Move logic to hooks and keep the component layer clean.
- [ ] **Customization**: Apply site-wide theme changes in the CSS variables.

### 3. Validation
- [ ] Verify accessibility compliance (ARIA labels, keyboard nav).
- [ ] Check for style conflicts with existing global CSS.

## Instructions
- **Variant Strategy**: Use established variants instead of ad-hoc Tailwind classes where possible.
- **Clean Imports**: Ensure imports are consolidated and follow the project's folder structure.

## Resources
- [shadcn/ui Docs](https://ui.shadcn.com/)
