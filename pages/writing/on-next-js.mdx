---
title: On Next.js
description: Frameworks exist not for our code, but for our minds.
date: 2021-09-14
slug: on-next-js
---

**tldr**: Next is easy to get started with, the developer experience is the best in the React ecosystem, file-based routing isn't bad, and any HTML with a `<script>` tag is an SPA.

---

In any programming paradigm, there are a number of best practices that come out over years as thousands and thousands of developers hack away at apps written in a given language. Rails for Ruby, Laravel for PHP, and now Next.js for React. (I'm considering React to be a language of its own at this stage.)

Frameworks exist not for our code, but for our minds. They are a way to think about building software. Consider the _Rails Way_. If you were building a new web project in Ruby, you would default to Rails. You know that it makes getting started easy, people coming into the project know what to expect, and you know that you are agreeing to the contract Rails offers you: **do things our way and we'll make your life easier**.

No one starts a Rails project worrying about the _running cost_. The upfront cost is low and you can trust Rails to make sure that things are performant and that in the future, Rails will continue to evolve and cover the newly-discovered best practices from the community at-large. Next.js is the Rails for React. It makes it ridiculously easy to get up-and-running. Get familiar with Next.js' conventions and you'll be able to create an app or jump into an existing one without difficulty and understand all the concepts it operates on. This affects the _startup cost_ and the _running cost_.

## Getting Started

Getting a Next.js app up-and-running is fast. You run `npx create-next-app -t appname` and you've got a state-of-the-art React app with TypeScript, ESLint, hybrid SSG and SSR build capabilities, per-page data fetching, and access to all the pre-built hooks, components, and plug-ins that the React and Next.js ecosystems have to offer. This means that there is little that the developer has to consider when starting out. They can focus on UI/UX and necessary features.

Next supports file-based routing that is easy to understand (extra so for frontend-focused developers without years of experience wrangling `routes.wtf`) and adding a new route requires merely adding a new file in `/pages`.

Next's API routes allow you to create backend logic alongside your frontend code. This lets frontend devs do backend-style tasks without asking a dedicated backend developer to create an API for them. You can handle secure session management, make secure API calls using environment variables, and create specialized APIs that exist solely for your frontend application.

## Possible Issues Going Forward

Every framework implies a certain level of lock-in. Because of the assumptions Next makes (file-based routing, pre-rendering of HTML, and hydrating pre-rendered HTML on client-side mount), there are caveats to working with Next.

The biggest complaint heard against Next.js is its file-based routing. Backend developers with years of experience writing `routes.wtf` files with 100+ lines in a `switch` statement feel comfortable there. Frontend developers (the type who got started with plain HTML, CSS, and JavaScript (as well as vanilla PHP) feel most comfortable with file-based routing. The browser itself works with file-based routing. SPAs trick the browser into thinking multiple documents exist on the server.

If you want to create an SPA that's as performant as a pre-rendered or server-rendered app, you need to lazy-load every route, set up code-splitting, and fight to keep your JavaScript bundle sizes small. Or, if you don't care about user experience or the user's bandwidth, you can load the whole app on the first page visit. File-based routing avoids this by automatically creating separate bundles for you for each page and smartly loading necessary dynamic data in the background as links come into the viewport.

Another area of contention over the use of Next.js when a client-side-only SPA would work is that Next.js always assume's there's a build step where the app exists in a Node.js environment, not the browser. If you need to access browser API's, you need to check if the app is running in a browser context. This is done with something like:

```javascript
if (typeof window !== "undefined") {
  // do something
}
```

Developers working on the application need to be cognizant of this. It's also easily avoided by refactoring this type of code to run inside of React's `useEffect` hook.

```javascript
useEffect(() => {
  // do something
}
```

Since anything touching the `window` global is outside React's render, it should be considered a side effect and handled thusly.

The final possible concern that should be addressed is that of hosting. Next.js, for a long while, was an SSR solution for React. Since v9.3, however, Next's support of pre-rendering improved greatly. Next.js apps are now hybrid in nature. They can be pre-rendered or server-rendered on a per-page basis. You can preload pages at pre-render time using the `getStaticProps` method that can be defined on any page, or you can force specific pages to be server-rendered by defining a `getServerSideProps` function. **Server-rendering is completely optional.** You can use the `next export` command to export a totally static site. Aside from the previously mentioned `typeof window` check, these exported sites behave the same as SPAs _(only with better performance)_.

Sadly, in order to get the most out of Next.js' capabilities, a Node.js hosting environment is necessary. If you run `next export`, you can throw the output up on any server, but you'll be unable to take advantage of Next's internationalized routing, API routes, and hybrid nature. You can run a Next app on any server that supports Node.js, but Vercel hosting is the best place to host a Next app. The service is optimized for Next, letting you even deploy a fully static website that has its own API routes that could be called client site. You might not even need a backend since Vercel API routes work with TypeScript, Go, and Ruby.

## "Sounds Like a Lot to Learn…"

If you've never worked in this style of development, it seems like overkill. "An SPA is fine." For the developer, maybe. But SPA's aren't a great experience for users, especially on phones. Whatever fears you have over lock-in with a framework, the benefits of letting the community figure out best practices and then using a framework that has adopted those best practices will save you from having to figure out what those best practices are on your own. You'll start faster, have a better developer experience, and your users will have a better experience.
