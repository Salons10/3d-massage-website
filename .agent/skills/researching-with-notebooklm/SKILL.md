---
name: researching-with-notebooklm
description: "Manages and queries NotebookLM notebooks via MCP. Use when the user needs to analyze specific documents, grounded research, or long-form content synthesis."
---

# Researching with NotebookLM

## When to use this skill
- When requested to "add a notebook" or "link a NotebookLM".
- When performing research that requires grounding in specific external documents or knowledge bases.
- When managing a library of research sources.

## Workflow

### 1. Adding a New Notebook
If the user provides a NotebookLM topic or source, follow this sequence:
- [ ] **Ask for URL**: "What is the NotebookLM URL?"
- [ ] **Ask for Content**: "What knowledge is inside?" (1-2 sentences)
- [ ] **Ask for Topics**: "Which topics does it cover?" (3-5)
- [ ] **Ask for Use Cases**: "When should we consult it?"
- [ ] **Confirm Summary**: Propose Name, Description, Topics, and Use Cases.
- [ ] **Execute**: Only call `add_notebook` after explicit "Yes".

### 2. Conducting Research
- [ ] **List Sources**: Use `list_notebooks` to see what is available.
- [ ] **Select Active**: Use `select_notebook` to set the context.
- [ ] **Multi-Pass Query**:
    - [ ] Start broad to establish context.
    - [ ] Drill down into specifics (API methods, edge cases).
    - [ ] Request production-ready examples grounded in sources.
- [ ] **Session Tracking**: Keep the `session_id` for related follow-up questions to maintain RAG context.

### 3. Troubleshooting Auth
- [ ] Use `get_health` to verify authentication state.
- [ ] If authenticated=false, prompt for `notebooklm.auth-setup`.
- [ ] If persistent issues occur, run `cleanup_data(preserve_library=true)` before re-attempting setup.

## Instructions
- **Stay Grounded**: If NotebookLM doesn't have the answer, state that "The sources do not contain this information" rather than hallucinating.
- **Session Continuity**: Always prefer continuing an existing session for the same research task.
- **Metadata Management**: When adding notebooks, ensure description and topics are concise but descriptive enough for future discovery.

## Resources
- [Research Log Template](resources/research-log.md)
