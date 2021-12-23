---
archived: true
title: Making Magic with Gridsome Environment Variables
slug: making-magic-with-gridsome-environment-variables
description: You can do some pretty interesting things with GRIDSOME environment variables.
image: "grant-ritchie-x1w_Q78xNEY-unsplash.jpg"
date: 2019-12-08T13:00:00.000+00:00
tags:
  - node
  - jamstack
  - javascript
  - gridsome
---

When working with [Gridsome](https://gridsome.org), you can have environment variables. Your usual environment variable is accessed using `SOME_VARIABLE_NAME`. This is great for stuff being processed by Gridsome's server API, but the client code probably doesn't need all your secret API keys and whatnot. Grisdsome has an affordance for client-side environment variables though. If you prefix your variable names with `GRIDSOME_`, just those variables will also be available in your client-side code. Non-secret stuff can be put in there without any worry. You can think grab those variables with `GRIDSOME_SOME_VARIABLE`.

What might you do with this? Well, at work, I have to build a lot of multi-lingual pages. These pages often do not share the same parent directory. If I want to build multiple pages using the same templates using different languages, it can get messy. I handled it by creating npm build scripts for each language where the npm script passes a language code as a `GRIDSOME_ENV_VAR`. I can use these on the server **and the client** so that I can use one set of templates, but dynamically add language-specific analytics code snippets and dynamically access different language files. In my server config and client-side helper functions, I can grab the current build language, and do whatever needs to be done.

```javascript
function translate(x) {
  // blah blah blah
  return someJSON[process.env.GRIDSOME_BUILD_LANG][x];
}
```

I then have an overall npm build script that gets run using [concurrently](https://www.npmjs.com/package/concurrently). I can run multiple builds at once, and it doesn't take any longer than if I were just processing a single build.

```json
"scripts": {
	"build-en": "GRIDSOME_BUILD_LANG=en npm run build",
  	"build-th": "GRIDSOME_BUILD_LANG=th npm run build",
  	"build": "concurrently 'npm:build-en' 'npm:build-th'"
}
```

If you find yourself creating different builds of stuff with Gridsome (I may be in a small group of developers doing this), reach for Gridsome's special client-side environment variables.
