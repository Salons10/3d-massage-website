# Architecture Quality Gate

### Structural integrity
- [ ] Logic extracted to custom hooks in `src/hooks/`.
- [ ] No monolithic files; strictly Atomic/Composite modularity.
- [ ] All static text/URLs moved to `src/data/mockData.ts`.

### Type safety and syntax
- [ ] Props use `Readonly<T>` interfaces.
- [ ] File is syntactically valid TypeScript.
- [ ] Placeholders like `StitchComponent` replaced with real names.

### Styling and theming
- [ ] Dark mode (`dark:`) applied to color classes.
- [ ] No hardcoded hex values; use theme-mapped Tailwind classes.
