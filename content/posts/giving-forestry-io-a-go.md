---
archived: true
title: Giving Forestry.io a Go
slug: giving-forestry-io-a-go
description: The one where I check out another headless CMS, for the second time.
image: "sebastian-unrau-sp-p7uuT0tw-unsplash.jpg"
date: 2019-12-05T17:00:00+09:00
tags:
  - jamstack
  - forestry
  - cms
---

Not much to say here. Just testing out [Forestry.io](https://forestry.io). I'm rather impressed by the ease of setup. I swear I tried this out earlier in the year, and had some sort of issue with it. This time, however, it was a breeze to set up, and I'm really digging it—at least until [TinaCMS](https://tinacms.org) is ready to work with Vue/Gridsome. Until then, this should do nicely! 🥳

The only issue I really had was getting media uploads to be correctly processed by Gridsome. The trick is, and it doesn’t seem to be documented on the Gridsome docs page, is to add `resolveAbsolutePaths: true` to your file system source options. Then, you get your media that’s uploaded through Forestry (or Netlify CMS too) to be correctly processed by Gridsome’s `g-image` component.
