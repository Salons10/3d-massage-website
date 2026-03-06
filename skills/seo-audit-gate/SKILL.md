---
name: seo-audit-gate
description: "Audits web pages for SEO best practices, meta tags, structure, and performance. Use before deployment or when the user asks for an 'SEO check.'"
---

# SEO Audit Gate

## When to use this skill
- Before deployment to ensure a site is crawlable and optimized.
- When the user explicitly asks for an "SEO check" or "SEO audit."
- When creating new pages to ensure baseline SEO compliance.

## Audit Checklist
1. **Meta Tags**: Verify `title` (50-60 chars) and `meta description` (150-160 chars) exist and include keywords.
2. **Heading Hierarchy**: Ensure only one `<h1>` per page. Verify sequential order (H1 -> H2 -> H3).
3. **Images**: Check that all `<img>` tags have descriptive `alt` attributes.
4. **Links**: Verify all internal links are valid and external links use `rel="noopener noreferrer"`.
5. **Performance**: Check for heavy assets or blocking scripts that would hurt Core Web Vitals.

## Action
- Scan the `@/src` or provided file.
- Generate a `FIX_LIST.md` report sorted by Critical, High, and Low priority.
- Do not approve deployment until Critical issues are resolved.
