---
date: 2019-01-27
description: "How I went about creating my own build system for templates needed for a project at work."
title: On Keeping Node Scripts Alive
slug: on-keeping-node-scripts-alive
---

I recently had a need to build a kind of one-off templating system at work. I
waffled around a lot when it came to the templating language. I bounced between
[EJS][], [Handlebars][], [Edge][], and [Nunjucks][]. Because I'm super familiar
with [Laravel Blade](https://laravel.com/docs/5.7/blade), I initially decided
on Edge, but Edge's documentation is pretty awful, and that just feels like a
bad sign. Nunjucks, on the other hand, has fantastic documentation and pretty
much all the features I want. I like Blade/Edge-style components more than
Nunjucks' macros, but I'm willing to make the trade-off. My needs for this
templating system are limited mostly to includes and layouts, with moderate
usage of components/macros.

After that, I need a way to auto-render as I'm developing. I started off with
[nodemon][], but I noticed a weird thing with using it as a module.

```javascript
const nodemon = require("nodemon");

nodemon({
  script: "app.js",
  ext: "njk",
});

nodemon.on("restart", (files) => console.log(files));
```

Nodemon has a nice event system that gives you info about what files triggered
the update, but you have to pass a script path into the config object. Since my
project just needs to run a function once per file save, not an ongoing
process, it felt weird passing a script it that didn't need to get run. It
worked, but felt weird.

After nodemon, I landed on [chokidar][]. Chokidar is a simpler file watcher. It
lets you do this.

```javascript
const path = require("path");
const builder = require("./app.js");

const watcher = require("chokidar")
  .watch("**/*.njk")
  .on("ready", () => console.log("Watching for changes..."))
  .on("change", (filepath) => {
    console.log(`${filepath} updated`);
    const data = path.parse(filepath);
    builder(data);
  });
```

It's a bit more direct and requires a little bit more care in how you setup the
output from scripts (because chokidar seems to eat the output from child
processes).

Lastly, I just include a call out to [BrowserSync][] to make hot reloading
possible. All in all, not a terrible setup. I'd normally be using [Nuxt][] for page
generation, but sometimes you have to deal with other peoples' terrible code.

_Update: like a hour after writing the original post_

Turns out, there's a [Nunjucks CLI project][nunjucks-cli]. It does pretty much
everything I hand-coded already. Run it like this:

`nunjucks '**/*.njk' -p templates -o dist data.json`

Processes all `.njk` files, with `templates` as the `src` directory, outputing to
`dist`, and all the data that needs to get passed to `render()` is in
`data.json`. I really should've known better. I guess though, while I did waste
a lot time figuring out some new things in Node.js, I learned a lot about Node
and its ecosystem at the same time.

[ejs]: http://www.ejs.co
[handlebars]: http://handlebarsjs.com/
[edge]: https://edge.adonisjs.com/
[nunjucks]: https://mozilla.github.io/nunjucks/
[nodemon]: https://nodemon.io/
[chokidar]: https://github.com/paulmillr/chokidar
[nuxt]: http://nuxtjs.org/
[browsersync]: https://www.browsersync.io/
[nunjucks-cli]: https://github.com/jeremyben/nunjucks-cli
