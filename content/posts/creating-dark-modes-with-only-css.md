---
archived: true
title: Creating Dark Modes With Only CSS
slug: creating-dark-modes-with-only-css
description:
  Developers often reach for JavaScript to implement dark modes, but it
  can be done with just CSS.
image: "todd-trapani-1tYLMbhn2MU-unsplash.jpg"
date: 2019-12-12T00:00:00+09:00
tags:
  - tailwindcss
  - design
  - javascript
  - css
---

I've seen a lot of buzz recently concerning dark modes and how to create them. The coming of dark mode in iOS seems to have triggered this, but I feel like everyone's going about it in the wrong way. Some people are creating solutions that check the `prefers-color-scheme` media query in CSS, but the majority of JavaScript-focused developers are taking a JS-only approach. They're using JS to programmatically check if the query is matched instead of just writing CSS to handle it. If it matches, they apply either a `light` class or a `dark` class. This works, but it seems unnecessary. If you're curious what the JS approach looks like, here you go.

I think the better solution to the problem is to lean into CSS custom properities. This can even be done with [Tailwind CSS](https://tailwindcss.com) by creating a few classes that handle the most common color issues, and then flip those inside a media query that checks `prefers-color-scheme`. You get immediate theme handling that doesn't require parsing or execution of any JavaScript.

```css
.text-default {
  @apply text-gray-900;
}

.bg-default {
  @apply bg-gray-100;
}

@media (prefers-color-scheme: dark) {
  .text-default {
    @apply text-gray-100;
  }

  .bg-default {
    @apply bg-gray-900;
  }
}
```

Yes, you'll be leaving IE11 theme support in the bin, but IE11 shouldn't be a top priority anyway. If it is, I doubt light and dark modes is an issue. Hit me up on [Twitter](https://twitter.com/brandonpittman) if you have thoughts.
