---
name: error-handling-patterns
description: Master error handling patterns across languages including exceptions, Result types, error propagation, and graceful degradation to build resilient applications. Use when implementing error handling, designing APIs, or improving application reliability.
---

# Error Handling Patterns

Build resilient applications with robust error handling strategies that gracefully handle failures and provide excellent debugging experiences.

## When to Use This Skill
- Implementing error handling in new features
- Designing error-resilient APIs
- Debugging production issues
- Improving application reliability
- Creating better error messages for users and developers
- Implementing retry, circuit breaker, or graceful degradation patterns

## Workflow
- [ ] Identify the type of error (Recoverable vs. Unrecoverable)
- [ ] Choose the appropriate philosophy (Exceptions vs. Result Types)
- [ ] Implement language-specific patterns (Check `examples/language_snippets.md`)
- [ ] Apply universal patterns (Circuit Breaker, Aggregation, Fallback)
- [ ] Validate error context and logging behavior

## Instructions

### 1. Identify Error Categories
* **Recoverable**: Network timeouts, missing files, invalid input. Use `try-catch` or `Result` types.
* **Unrecoverable**: OOM, Stack Overflow, programming bugs. Allow the system to fail fast (Panics).

### 2. Choose Philosophy
* **Exceptions**: Best for unexpected/exceptional conditions in high-level logic.
* **Result Types**: Best for expected failures (validation, API calls) where explicit handling is desired.

### 3. Universal Patterns

#### Circuit Breaker
Prevents cascading failures. If a service fails N times, open the circuit and reject requests for a cooldown period.

#### Error Aggregation
Collect multiple errors (e.g., field-level validation) rather than failing on the first one. Use `AggregateError` in TS or a custom collector in Python.

#### Graceful Degradation
Provide fallbacks. If the cache fails, hit the DB. If the DB fails, return a default value or a cached stale state.

## Best Practices
1. **Fail Fast**: Validate input early.
2. **Preserve Context**: Always include stack traces and metadata.
3. **Meaningful Messages**: Explain *what* happened and *how* to fix it.
4. **Don't Swallow Errors**: Never use an empty catch block.

## Resources
- [Language-Specific Snippets (Python, TS, Rust, Go)](examples/language_snippets.md)
