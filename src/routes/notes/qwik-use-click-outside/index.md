---
title: "On useClickOutside for Qwik"
date: "2024-09-29"
---

Everybody needs a click outside helper eventually.
Here's one for Qwik that I lifted this from [here](https://code.build/p/RUGSxMmSnVizh6UTBoSJ17/building-a-custom-menu-hook-with-qwik), but I made one change that I think is important: I pass the event to the callback.

```tsx
import type { QRL, Signal } from "@builder.io/qwik";
import { $, useOnDocument } from "@builder.io/qwik";

type Ref = Signal<HTMLElement | undefined>;

export const useClickOutside = (
  ref: Ref,
  onClickOut: QRL<(event: Event, ref: Ref) => void>
) => {
  useOnDocument(
    "click",
    $((event) => {
      if (!ref.value) {
        return;
      }
      const target = event.target as HTMLElement;
      if (!ref.value.contains(target)) {
        onClickOut(event, ref);
      }
    })
  );
};
```
