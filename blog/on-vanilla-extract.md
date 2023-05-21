---
date: 2023-05-21
meta:
  title: On Vanilla Extract
  description: "Notes on the CSS-in-TypeScript library Vanilla Extract"
---

_Last updated: May 21, 2023_

## Sprinkles Isn't Tailwind

Because of the mindshare that Tailwind has, library authors and consumers often attempt to compare other styling tools and libraries as something akin to Tailwind.
[Vanilla Extract][ve] makes that same mistake with its utility CSS extenstion, [Sprinkles][sprinkles].

> Basically, it’s like building your own zero-runtime, type-safe version of Tailwind, Styled System, etc.

That's the callout they use in the documentation.
But Sprinkles fails miserably at being Tailwind.
The biggest problem is that unlike Tailwind, Sprinkles can't purge unused styles.
If you try to include everything Tailwind gives you, your CSS bundle would be huge.
But if you use Sprinkles to generate only utilities you actually use, it works very well.
It encourages you, by its lack of style purging, to use utilities sparingly.
It reminds me of the "U" in [CUBE CSS][cubecss].

A great feature of Vanilla Extract, when used with Sprinkles, is that you can compose styles using Vanilla Extract's `style` function and your pre-compiled sprinkles.
Consider a class like this:

```ts
let component = style([
  sprinkles({
    backgroundColor: "dark",
    color: "light",
  }),
  {
    borderRadius: "7px",
  },
]);
```

When this `component` class is created, it will be a concatenation of two utilities and a scoped one-off class that handles the border-radius.
Used this way, your sprinkles can be used everywhere—reducing bundle size—while allowing for logical grouping and creating the occaissional one-off style block.

[ve]: https://vanilla-extract.style
[sprinkles]: https://vanilla-extract.style/documentation/packages/sprinkles/
[cubecss]: https://cube.fyi/utility.html
