---
archived: true
title: Creating a Burner List in Things
slug: creating-a-burner-list-in-things
description: Adapting Jake Knapp's Burner List to work with Things' Today list.
image: "1*kow_oGdYNmcZFwMDQwVAGQ.png"
date: 2020-01-03T00:00:00+09:00
tags:
  - mac
  - automation
  - jxa
  - applescript
  - make time
  - productivity
  - gtd
---

Howdy yo! Happy New Year everyone! It's time for resolutions and all that jazz, so here's a little productivity thing I've been doing lately. I've been a huge proponent of [Getting Things Done](https://gettingthingsdone.com) for a long time. I used [OmniFocus](/focusing) for years to manage my tasks, but in 2019, I switched _back_ to [Things](https://culturedcode.com/things/). I also read [Make Time](https://maketime.blog/books/), which led me to the idea of the _Burner List_.

The Burner List is essentially a way to focus on 1–2 projects per day, with space for incidentals that pop up along the way. You have a front burner for your main project, a back burner for another less important project, and then a kitchen sink to hold all the other shit you need to get done. Jake Knapp's original blog post outlined a paper-based way of doing this, but I wanted to do it with Things.

Simply put, I use Things' tags and _Today_ list to keep these organized. Each morning, I go to the Today list, and I assign _Front Burner_, _Back Burner_, and _Kitchen Sink_ tags to everything I want to get done that day. Sadly, Things doesn't allow for sorting by tag, so you're on your own if you want to put them in order. I find filtering by tag to be okay.

One issue I ran into was that those tags would stick with my tasks the following day, which wasn't always what I wanted. I whipped up a little AppleScript (JXA-syntax) to help clear them out each morning. I run the following script each morning using a launch daemon.

```javascript
var app = Application("Things3");
var todos = app.lists.whose({ name: "Today" }).toDos()[0];
var tagsToRemove = ["Kitchen Sink", "Front Burner", "Back Burner"];

todos.forEach((todo) => {
  var tags = todos[0].tagNames().split(", ");
  todo.tagNames = tags.filter((tag) => !tagsToRemove.includes(tag)).join(", ");
});
```

So, if you're looking to simplify your task wrangling, the Burner List is a straight-forward way of doing so. Hit me up on [Twitter](https://twitter.com/brandonpittman) if you have any comments or questions.
