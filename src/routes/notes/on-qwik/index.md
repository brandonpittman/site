---
title: On Qwik
date: 2023-07-23
---

<!--
## Core Library

It's the tits.

## Qwik City

It's also the tits.
-->

## Ecosystem

Like any new framework, the thing working against Qwik is the size of its ecosystem
It's nowhere close to what React or even Solid has
The form library being pushed on the Qwik site is [Modular Forms][]
It's a great form library, but it's really a Solid library that supports Qwik
The Modular Forms API is pretty much the Solid Start API for forms
It works, but it doesn't use Qwik City's built-in `<Form />` component and it doesn't feel Qwik-native
Qwik also lacks a good headless component library
React has [React Aria Components][rac] and even Solid has [Kobalte][].

The seemingly most popular option for Qwik is [QwikUI][], but it's not at all ready for use and it lacks the polish of both React Aria and Kobalte
The community of people working on QwikUI seems to be passionate about the project, so I'm hoping they pull this thing off
There also isn't a great option for JS-backed animations with Qwik
React has Framer Motion (along with dozens of other libraries)
Solid has an official integration for the WAAPI library, Motion One
Qwik doesn't have an integration, and the Motion One team has no interest
There's a PR sitting around that would add partial Motion One support for Qwik, but it's in purgatory as of now.

A Qwik feature that makes it easy to adopt Qwik, but also might prevent developers from building Qwik-native libraries, is Qwik's [`qwikify$`][qwikify] function.
It turns a React component into a Qwik component
It means you could bring over React Aria Components or Framer Motion into Qwik (if you're okay with doing hydration on those components).

<!-- links -->

[modular forms]: https://modularforms.dev/qwik/guides/introduction
[qwik]: https://qwik.builder.io/
[qwikcity]: https://qwik.builder.io/docs/qwikcity/
[qwikui]: https://qwikui.com/
[qwikify]: https://qwik.builder.io/docs/integrations/react/
[kobalte]: https://kobalte.dev/docs/core/overview/introduction
[rac]: https://react-spectrum.adobe.com/react-aria/react-aria-components.html
