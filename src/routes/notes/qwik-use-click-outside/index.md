---
title: "On useClickOutside for Qwik"
date: "2023-10-13"
---

Everybody needs a click outside helper eventually.
Here's one for Qwik that I lifted this from [here](https://code.build/p/RUGSxMmSnVizh6UTBoSJ17/building-a-custom-menu-hook-with-qwik), but I made one change that I think is important: I pass the event to the callback.

```
import type { QRL, Signal } from "@builder.io/qwik";
import { $, useOnDocument } from "@builder.io/qwik";

export const useClickOutside = (
  ref: Signal<HTMLElement | undefined>,
  onClickOut: QRL<(event: Event) => void>
) => {
  useOnDocument(
    "click",
    $((event) => {
      if (!ref.value) {
        return;
      }
      const target = event.target as HTMLElement;
      if (!ref.value.contains(target)) {
        onClickOut(event);
      }
    })
  );
};
```
