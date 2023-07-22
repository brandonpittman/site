import { component$, useStylesScoped$ } from "@builder.io/qwik";

export default component$(() => {
  useStylesScoped$(`
      body {
    margin: 0;
  }
  div {
    --size-step-4: clamp(2.33rem, calc(1.5rem + 4.14vw), 5rem);
    background-color: black;
    block-size: 100vh;
    inline-size: 100vw;
    color: white;
    display: grid;
    place-content: center center;
    font-size: var(--size-step-4);
    font-family: Georgia;
  }

`);
  return <div>You could leave life right now.</div>;
});
