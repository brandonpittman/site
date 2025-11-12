---
date: "2022-05-15"
title: On usePresence
description: "How to use Framer Motion's usePresence with Tailwind CSS."
---

Framer Motion has a page about [reducing bundle size][]. That page states that if you only import `AnimatePresence` and `usePresence`, to just do exit animations with CSS animations, you'd only import 1.4Kb of JavaScript. But they don't provide any example of that. Here you go:

```tsx
import { AnimatePresence, usePresence } from "framer-motion";
import { classNames } from "~/lib/utils/class-names";
import { useCallback } from "react";

const Box = ({ count }: { count: number }) => {
  const [isPresent, safeToRemove] = usePresence();

  const onAnimationEnd = useCallback(() => {
    if (!isPresent) safeToRemove();
  }, [isPresent, safeToRemove]);

  return (
    <p
      className={classNames(isPresent ? "animate-fade-in" : "animate-fade-out")}
      onAnimationEnd={onAnimationEnd}
    >
      Hello, there! I'm #{count}.
    </p>
  );
};

export default function Playground() {
  const [count, setCount] = useState(1);
  const inc = setCount((p: number) => p + 1);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-16">
      <button onClick={inc}>Next &rarr;</button>

      <AnimatePresence exitBeforeEnter>
        <Box key={count} count={count} />
      </AnimatePresence>
    </div>
  );
}
```

[This snippet is also available as a Gist.][gist]

The important part of this snippet is the `onAnimationEnd` event. We use this
event to trigger a callback that grabs the `isPresent` value from `usePresence`
and then if it's `false`, we call the `safeToRemove` function returned by
`usePresence`. By doing this, we have a clean way of telling Framer Motion's
`AnimatePresence` component that our animation's done without resorting to
using `setTimeout`, which would likely grow out of sync with our actual
animations over time.

[reducing bundle size]: https://www.framer.com/docs/guide-reduce-bundle-size/
[gist]: https://gist.github.com/brandonpittman/3a869011ba67f16bde8de67ef299e0ed
