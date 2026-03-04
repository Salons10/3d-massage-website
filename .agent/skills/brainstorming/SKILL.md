---
name: brainstorming
description: "Used before creative work like creating features, building components, or modifying behavior. Explores user intent, requirements, and design through natural dialogue before implementation."
---

# Brainstorming Ideas Into Designs

## When to use this skill
- Before starting any new feature or component development.
- When existing functionality needs a significant behavior modification.
- When requirements are vague or user intent needs further exploration.

## Workflow
1.  **Preparation**
    - [ ] Check current project context (files, docs, recent commits).
2.  **Idea Refinement**
    - [ ] Ask one question at a time to refine the idea.
    - [ ] Prefer multiple-choice options where possible.
    - [ ] Focus on purpose, constraints, and success criteria.
3.  **Approach Exploration**
    - [ ] Propose 2-3 different approaches with trade-offs.
    - [ ] List your recommended option first with reasoning.
4.  **Design Presentation**
    - [ ] Break design into 200-300 word sections.
    - [ ] Validate each section with the user before proceeding.
    - [ ] Cover architecture, components, data flow, and testing.
5.  **Finalization**
    - [ ] Document the validated design in `docs/plans/`.
    - [ ] Commit the design document to git.

## Instructions
### Understanding the Idea
*   **One Question at a Time**: Never overwhelm the user with multiple queries. Wait for a response before asking the next question.
*   **Context First**: Always use `list_dir` or `view_file` on relevant directories to understand the current state before asking clarifying questions.

### Exploring Approaches
*   Present 2-3 distinct paths. For example, a "minimalist/direct" approach vs. a "flexible/scalable" approach.
*   Clearly state the trade-offs: "Option A is faster to implement but harder to maintain, while Option B..."

### Presenting the Design
*   Use small, digestible sections.
*   Check for alignment: "Does the proposed component structure match your expectations so far?"

## Resources
- [Design Template](resources/design-template.md)
