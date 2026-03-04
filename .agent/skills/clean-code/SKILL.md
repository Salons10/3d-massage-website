---
name: clean-code
description: "Enforces clean code principles. Use when writing, reviewing, or refactoring code to ensure readability, maintainability, and standard naming conventions."
---

# Clean Code Enforcer

## When to use this skill
- When writing new code to ensure it meets senior-level standards.
- During code reviews to identify readability or architectural issues.
- When refactoring legacy code to improve maintainability.

## Guidelines
- **Meaningful Names**: Variables and functions must be descriptive (e.g., `daysSinceLastVisit` instead of `d`).
- **Functions**: Should do one thing only. If a function is >20 lines, suggest breaking it down.
- **Comments**: Comments should explain *why*, not *what*. Delete commented-out code.
- **Error Handling**: Use exceptions rather than return codes.
- **DRY (Don't Repeat Yourself)**: Identify duplicate logic and suggest abstractions.

## Instructions
- If generating code, apply these rules immediately.
- If reviewing code, list specific violations and rewrite the snippet to be "clean."
- Prioritize readability over cleverness.
