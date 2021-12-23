---
archived: true
date: 2021-02-05 17:00:00 +9:00
slug: defer-taskpaper-tasks-one-day.md
description: Scripting TaskPaper for fun and profit. Stoic Productivity scripting at its finest.
title: Defer TaskPaper Tasks One Day with JavaScript
tags: ["taskpaper", "productivity", "macos", "automation", "scripting"]
---

Since I've been experimenting with using TaskPaper again instead of Things,
I've starting scripting TaskPaper a bit. Here's a fun little script that will
defer `@start(..)` tags by one day. If the tag is tagged with `@today`, it'll
remove the `@today` tag and replace it with a `@start` tag for the following
day.

```javascript
var TaskPaper = Application("TaskPaper");

function TPContextGetCurrentPath(editor, options) {
  var selection = editor.selection;
  var selectedItems = selection.selectedItems;

  editor.outline.groupUndoAndChanges(function () {
    selectedItems.forEach(function (each) {
      var attributeName = "data-" + options.tag;
      var startDate = each.getAttribute(attributeName);

      if (startDate) {
        each.setAttribute(
          attributeName,
          DateTime.format(startDate + options.offset)
        );
      } else {
        each.setAttribute(
          attributeName,
          DateTime.format("today " + options.offset)
        );
        if (each.hasAttribute("data-today")) each.removeAttribute("data-today");
      }
    });
  });

  editor.moveSelectionToItems(selection);
}

var path = TaskPaper.documents[0].evaluate({
  script: TPContextGetCurrentPath.toString(),
  withOptions: {
    tag: "start",
    offset: "+1d",
  },
});
```
