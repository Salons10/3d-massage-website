---
name: stitch-react-components
description: "Converts Stitch designs into modular Vite and React components. Handles high-reliability asset fetching, logic isolation, and data decoupling."
---

# Stitch to React Components

## When to use this skill
- When moving from a design-only Stitch project to a functional React implementation.
- When requested to "convert screen to React" or "build components from design".

## Workflow

### 1. Retrieval
- [ ] **Namespace Discovery**: Identify the Stitch MCP prefix.
- [ ] **Metadata Fetch**: Call `get_screen` for the target design JSON.
- [ ] **High-Reliability Download**: Use `bash scripts/fetch-stitch.sh` for HTML code if standard fetch fails.
- [ ] **Visual Audit**: Review the screenshot for layout fidelity.

### 2. Execution
- [ ] **Data Layer**: Create `src/data/mockData.ts` and move static text/URLs there.
- [ ] **Component Drafting**: Generate modular component files using `resources/component-template.tsx`.
- [ ] **Logic Isolation**: Extract handlers to `src/hooks/`.
- [ ] **Style Mapping**: Extract Tailwind config and sync with `resources/style-guide.json`.
- [ ] **Validation**: Run `npm run validate` and check against the `architecture-checklist.md`.

## Instructions

### Architectural Rules
*   **Strict Modularity**: No monolithic files. Use Atomic/Composite component patterns.
*   **Type Safety**: Every component must include a `Readonly` TypeScript interface for props.
*   **Clean Output**: Omit Google license headers in final user components.
*   **Theme Sync**: Use theme-mapped Tailwind classes rather than arbitrary hex codes found in source HTML.

## Resources
- [Fetch Script](scripts/fetch-stitch.sh)
- [Component Template](resources/component-template.tsx)
- [Architecture Checklist](resources/architecture-checklist.md)
