---
archived: true
title: Experiencing a Crisis of Faith (in Vue)
slug: experiencing-a-crisis-of-faith-in-vue
description: I love Vue but lately I've been worried about the community around it.
image: "jametlene-reskp-gVfGGb62Fpo-unsplash.jpg"
date: 2020-04-18T00:00:00+09:00
tags:
  - fp
  - javascript
  - reason
  - react
  - vue
---

I've been a heavy Vue.js user for about 3 years now. I learned Vue before I learned enough about JavaScript to feel comfortable in vanilla JS even. (That may not have been a good thing.) I learned Vue because Laravel people used Vue and I had been learning Laravel at the time. React (and JSX) looked too hard because lots of JavaScript felt too difficult at the time. Had I felt more comfortable with JS—or hadn't been coming from Laravel—I may have wound up starting with React instead of Vue.

I've gotten a lot out of Vue. I built this blog with Gridsome, a single-page app at my first real programming job, and frequently used Nuxt and Gridsome to build landing pages at my current place of work. I have been happy with the DX Vue and its community has provided.

What worries me is the conservatism or just lack of vision in the Vue community. It always feels like Vue is just copying or playing catch up with React. The first thing that made me think this a while ago is that Nuxt is mostly a copy of Next.js (and for fuck's sake, all they did was change the _e_ to _u)_. Gridsome, which I love, is a copy of Gatsby. The design of the Gridsome site is just the Gatsby design in a different color and the title even starts with the same letter. 🤦‍♂️

With Vue 3, Vue is mostly just adding in features that React pioneered.

1. The composition API is React Hooks.
2. Suspense is just Suspense.
3. Teleport is Portal.

Vue 3 should be smaller and faster, which is great. The composition API is a great update on the Hooks API. You'll even be able to write functional components that directly return JSX if you're just using the setup method of the composition API. It's looking an awful lot like React. So if Vue is looking more and more like React, why not just use React? I find myself wanting to write JSX more than Vue templates lately, and the more I get into functional programming, the more I want to avoid using components with this and their own state. I got deep into ReasonML last week, and I looked at Reason's React support and found myself thinking, **Vue is never gonna have any support for this**.

The final thing that's got me longing to be on the React side is all the stuff that Zeit's doing. I use Now to host this blog and it works great with Vue-based Nuxt and Gridsome apps. But, if you're on-board with what Zeit is doing, writing apps with Next.js makes a lot of sense. Now and Next work beautifully together. Zeit is financially incentivized to be at the forefront of web dev and to push the capabilities of Next.js because they make money from it. Likewise, Gatsby is making money from their stuff. If Nuxt couldn't come up with a name that wasn't 75% the same as the framework they're copying, how much faith can you have in them to come up with any other original ideas?

I hate that I'm feeling so negative about Vue right now. I've been looking forward to Vue 3 for such a long time, I've spent hours and hours writing Gridsome plugins over the last year, and I genuinely enjoy writing Vue. I have reservations about Vue being able to do anything original in the future. Vue is the Japan of programming. Japan is great at perfecting the ideas of other countries, but kind of terrible at coming up with their own 💩.
