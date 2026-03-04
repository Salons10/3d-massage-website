---
name: stitch-design-md
description: "Analyzes Stitch projects to synthesize comprehensive DESIGN.md files. Documents mood, color palettes with hex codes, typography rules, and component stylings in natural language."
---

# Stitch Design Analysis (DESIGN.md)

## When to use this skill
- When starting a new project or page that needs to match an existing design language.
- When requested to "document the design" or "create a DESIGN.md".
- Before using the `stitch-loop` or `enhance-prompt` skills to ensure visual consistency.

## Workflow

### 1. Retrieval
- [ ] **Discover Namespace**: Use `list_tools` to find the Stitch MCP prefix.
- [ ] **Identify Project**: Use `list_projects` if the ID is unknown.
- [ ] **Fetch Metadata**: Use `get_screen` for the source screen (e.g., "Home" or "Landing").
- [ ] **Download Assets**: Fetch HTML/CSS from `htmlCode.downloadUrl` for deep analysis.

### 2. Analysis & Synthesis
- [ ] **Extract Identity**: Note Project Title and ID.
- [ ] **Define Atmosphere**: Describe the "vibe" (e.g., Airy, Minimalist, Utilitarian).
- [ ] **Map Palette**: List colors with hex codes and functional roles (e.g., "Deep Teal (#294056) for primary actions").
- [ ] **Translate Geometry**: Convert technical values (border-radius, etc.) into physical descriptions.
- [ ] **Describe Elevation**: Document shadows and layering strategy.

### 3. Documentation
- [ ] **Create File**: Write the analysis to `DESIGN.md` in the project root.
- [ ] **Review Format**: Ensure it follows the standardized structure (Atmosphere, Palette, Typography, Components, Layout).

## Instructions

### Semantic Design Interpretation
*   **Avoid Jargon**: Do not use Tailwind classes like `rounded-xl` in the final document. Use "generously rounded corners".
*   **Precision and Role**: Always include the hex code and explain *why* that color exists in the system.
*   **Mood Boarding**: Use evocative adjectives to help the model "visualize" the theme for future generations.

## Resources
- [Stitch Prompting Guide](https://stitch.withgoogle.com/docs/learn/prompting/)
