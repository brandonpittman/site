---
archived: true
slug: all-in-on-tailwind
date: 2019-07-27
title: All In On Tailwind
description: Where I eschew all CSS files and put everything into Tailwind's config file.
image: "wing-with-sunset.jpg"
tags: ["tailwind", "css", "postcss"]
---

I'm a huge fan of Tailwind if you didn't already know. I also just love plain
old CSS. I actually think CSS is the most interesting part of web development,
to tell you the truth. But this site actually doesn't contain even a single CSS
file in its source code. By using the provided default Tailwind CSS files as
Webpack imports through my Gridsome/Tailwind plugin, I'm able to pull in all of
that initial Tailwind stuff without the usual…

```less
@tailwind base;
@tailwind components;
@tailwind utilities;
```

…boilerplate that the Tailwind docs tell you to include in your project.

All of my base styles, globally-used components, and site-wide utilities are
declared in `tailwind.config.js` and then all my global stuff is kept there,
with the full power of JavaScript available to manipulate things, without the
need for a pre-processor language like Sass or Less. Sure, I'm using PostCSS,
but any monkeying I do with the CSS is done with JavaScript, which is far more
standard (and powerful) than any pre-processor language. Of course, I can still
include one-off components in Vue `script` tags in my components if need be,
but it removes one more thing from the pipeline, which seems like a good thing
to me.
