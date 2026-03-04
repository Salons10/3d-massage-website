---
name: stitch-enhance-prompt
description: "Transforms vague UI ideas into polished, Stitch-optimized prompts. Injects design system context and structures output for high-fidelity generation."
---

# Stitch Prompt Engineering

## When to use this skill
- Before sending a prompt to Stitch to ensure high-quality output.
- When an initial generation result is poor and needs refinement.

## Workflow

### 1. Assessment
- [ ] **Check Inputs**: Platform, Page Type, Structure, Visual Style.
- [ ] **Check Consistency**: Read `DESIGN.md` if available to inject system context.

### 2. Refinement
- [ ] **Amplify Vibe**: Add descriptive adjectives (Clean, Vibrant, Professional).
- [ ] **Keyword Conversion**: Swap vague terms (menu) for specific UI components (navigation bar).
- [ ] **Structure Content**: Organize into numbered sections (Header, Hero, Feature Grid, Footer).

### 3. Output
- [ ] Format as a "DESIGN SYSTEM (REQUIRED)" block followed by "Page Structure".

## Instructions
- **Incremental Edits**: For feature requests (e.g., "add a search bar"), describe the targeted edit clearly while preserving existing design.
- **Hex Precision**: Always use descriptive names followed by hex codes in parentheses.

## Resources
- [Stitch Prompting Guide](https://stitch.withgoogle.com/docs/learn/prompting/)
