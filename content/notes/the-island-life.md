---
title: The Island Life
date: 2026-08-17
location: Nagoya
description: A look at implementing islands in SvelteKit with Ogygia.
draft: false
---

## Islands

Oh boy! Finally a post about actual development and not just Stoicism. Maybe we'll find a Stoic connection in here later, but first, [what are islands](https://jasonformat.com/islands-architecture/)? Islands are little silos of JavaScript. You write pages that are static and only load JS for the interactive bits. This is how the Web worked before React hydrated the whole page. We've been fighting against the voice in the back of our heads telling us that whole-page hydration is a bad idea for years, but the capabilities we gain by hydrating the whole page was too alluring. Enter islands. The island patterns aims to keep the frontend framework and push the hard part of containing hydration to interactive sections of a page. SvelteKit lets you add:

```typescript
export const csr = false;
```

at the top of a `+page.ts` file, but that turns off hydration for the whole page. It's all or nothing. The [ogygia library](https://ogygia.puruvj.dev/) aims to let you have your cake and eat it too. It mostly succeeds.

## Concerns

You can read the docs linked above and I think you'll see that the ideas being worked on there are interesting. The author cares about this functionality deeply. But this is also the first library I've tried that really feels like it's been vibe-coded. Every commit is co-authored by Claude and promises about fixing bugs didn't pan out because of a Claude-rewritten change of a `CHANGELOG.md` file overwrote a fix to mission-critical source code. While the ideas of the person driving the AI are great, the execution of writing the code with AI has made adoption of the library for this blog impossible. 

## Future

I really hope that this library continues evolving and I really hope it gets Sherlocked by actual SvelteKit, but until then, I'm hoping the care and attention hand-coding usually necessitates gets done even with the AI coding partner.
