---
date: 2022-07-27
meta:
  title: On usePortal
  description: "A React Hook to make using Portals easier."
---

Here's a [gist][] showing a `usePortal` hook to make using React Portals easier.

```ts
import {
  createPortal as createReactPortal,
  unmountComponentAtNode,
} from "react-dom";
import { useState, useCallback, useEffect } from "react";

export let usePortal = (el: Element = document.body) => {
  let [portal, setPortal] = useState<{
    render: Function;
    remove: Function;
  }>({
    render: () => null,
    remove: () => null,
  });

  const createPortal = useCallback((el) => {
    let Portal = ({ children }: { children: Element }) =>
      createReactPortal(children, el);
    let remove = () => unmountComponentAtNode(el);
    return { render: Portal, remove };
  }, []);

  useEffect(() => {
    if (el) portal.remove();
    let newPortal = createPortal(el);
    setPortal(createPortal(el));
    return () => {
      newPortal.remove();
    };
  }, [el, createPortal, portal]);

  return portal.render;
};
```

[gist]: https://gist.github.com/brandonpittman/41c19d9cd900f8f8d4ebdc9bc6486a43
