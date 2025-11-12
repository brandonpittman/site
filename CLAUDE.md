# Low-overhead > capability always. Challenge wrong paths.

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Language Requirements

All issues, pull requests, and generated documentation should be written in both English and Japanese.

## Svelte

- Use the Svelte 5 documentation located in ./llms-full.txt

### Testing

- https://svelte.dev/docs/svelte/testing

## Testing SvelteKit Apps

Write the minimum tests that catch production bugs I'd be embarrassed about.

**Structure:**

- Use `describe` and `it.skip` to plan upfront - I see the full scope, you implement what matters
- Remove `.skip` as features ship, no coverage theater

**Component tests:**

- Never use `container` from render - always use `page.getBy*()` locators
- Semantic queries first: `getByRole`, `getByLabelText`, `getByText`
- Use `.first()`, `.nth()`, `.last()` for multiple elements
- Always `await expect.element()` for assertions
- Test user value (roles, visible text, actions) not implementation (SVG paths, internal markup)

**Server tests:**

- Use real `FormData` and `Request` objects - catches field name mismatches
- Mock external services (database, APIs, filesystem) not data contracts
- Share validation logic between client/server (use zod/mini—not full zod)

**Svelte 5 runes:**

- Wrap `$derived` values in `untrack()`: `expect(untrack(() => doubled)).toBe(10)`

**What to test:**

- Critical paths: form submission with errors, successful save, loading states
- One happy path e2e, one critical failure mode
- What breaks revenue

**What to skip:**

- Utility functions under 5 lines
- Trivial prop checks
- Exhaustive edge case matrices

**Code style:**

- `snake_case` for variables/functions
- `kebab-case` for files
- TitleCase for interfaces

## Code Style

- Prefer snake_case for new variables and function names.

## Old Qwik App

- The old app we're migrating from is located in ./src.qwik.bak.

## Todos
