---
archived: true
date: 2021-02-05 22:00:00 +9:00
slug: taskpaper-startdate-to-today
description: Change all the TaskPaper `@start(currentDate)` tags to `@today`.
title: Automagically Update TaskPaper Start Dates
tags: ["taskpaper", "productivity", "macos", "automation", "scripting"]
---

Since I've been experimenting with using TaskPaper again instead of Things,
I've starting scripting TaskPaper a bit. Here's a fun little script that will
update `@start(..)` tags that match the current date by removing the start date
and adding `@today`. Combine this script with an app like [EventScripts][] to
run each time TaskPaper is activated to always keep your `@start` tags up to
date!

```javascript
var TaskPaper = Application("TaskPaper");
TaskPaper.includeStandardAdditions = true;
var todayAttr = "data-today";

var app = Application.currentApplication();
app.includeStandardAdditions = true;
var dateToday = app.doShellScript("date +%F");

function TPContextGetCurrentPath(editor, options) {
  editor.outline.groupUndoAndChanges(function () {
    editor.outline.items.forEach((item) => {
      const startDate = item.getAttribute("data-start");
      if (startDate === options.dateToday) {
        item.removeAttribute("data-start");
        item.setAttribute("data-today", "");
      }
    });
  });
}

var path = TaskPaper.documents[0].evaluate({
  script: TPContextGetCurrentPath.toString(),
  withOptions: {
    dateToday,
  },
});
```

[eventscripts]: https://www.mousedown.net/software/EventScripts.html
