---
slug: reasonml-in-2020
date: 2020-09-05
title: ReasonML in 2020
description: The one where I talk about the goofy mess ReasonML has become.
archived: true
tags: ["reasonml", "javascript", "rescript", "bucklescript"]
---

## The Good

I first looked into ReasonML at the beginning of 2020 as part of my functional programming journey. While not strictly an FP language, ReasonML (being an alt-OCAML) has automatically curried functions, immutable data structures, and a much leaner syntax compared to TypeScript. While I've come to appreciate TypeScript (having worked on an Angular project at work since May), I still find TypeScript to be a stop-gap in the world of JavaScript. ReasonML promised to be a more well thought out alternative to TypeScript. It also helps that the BuckleScript compiler (part of the ReasonML to JavaScript toolchain) is much faster than TypeScript's compiler.

### My Top 5 ReasonML Features

- Immutable by default
- Curried functions
- Switch statement doubles as pattern-matching
- `null` replaced by `None` and `Some('a)`
- Prioritizes linked lists over arrays

I was pretty excited about the language, read over all the docs a couple times, and then…nothing. Integrating ReasonML into my existing JavaScript projects wasn't technically hard, but it just seemed like a pain that maybe wasn't worth it. Why did it seem like a pain?

## The Bad

The pain point with ReasonML is JS interop. ReasonML actually has a good JS interop story (compared to a language like [Elm][].) If you want to access something you'd normally have global access to in JS, you have to pull it out of the `Js` module from BuckleScript. Want to map over a list or array? The method is in the standard library, but which standard library should you use? The ReasonML one is the same as OCaml's, there's a BuckleScript library called _Belt_, and then there's another one called _Js_. The ReasonML one is structured like an FP library. The array methods take the function first _and then the collection_.

### `Array`

```reason
let mapper = item => item + 1
let collection = [|1,2,3|]
Array.map(mapper, collection)
```

`Belt` and `Js` have the same, but they include `.Array2` modules that flip the arguments so it looks like JavaScript's collection methods. Maybe you're starting to see the identity crisis happening over in Reason Town.

### `Js.Array2`

```reason
let mapper = item => item + 1
let collection = [|1,2,3|]
Js.Array2.map(collection, mapper)
```

### Other People's Code

Another major pain point is working with third-party libraries. If you're writing logic that's all your own code, working with ReasonML is easy-peasy. The moment you start pulling in other people's code, you start having to do this.

```reason
[@bs.module "lodash"]
external kebabCase: string => string = "kebabCase"
```

…for pretty much everything. If you thought getting types for TypeScript was a pain sometimes, ReasonML is much worse. There are community-backed binding packages you can `npm install`, but the majority of them are poorly maintained and you're on your own for adding types to Reason for third-party code. In my recent experiment where I converted this blog over to ReasonReact, the majority of my time was spent writing FFI glue code for third-party libraries and for React components written in JavaScript.

## The Ugly

So far, the problems you'll encounter with ReasonML are mostly unavoidable. It's a bigger departure from JavaScript than TypeScript is, but you get a lot more for it. The ugly part of ReasonML is the toolchain and the confusing ecosystem. In order to compile Reason to JavaScript, you need a compiler called BuckleScript. BuckleScript takes the OCaml code and turns it into JavaScript, and does it very well. The problem lies in that BuckleScript is almost it's own syntax on top of Reason. It's got a bunch of decorators to enable JS interop and handle OCaml language features that aren't present in JavaScript. These BuckleScript things don't carry over to coding Reason for native platforms. The time spent learning this BuckleScript-specific stuff is JavaScript-focused only.

Recently, the team behind BuckleScript (not the ReasonML-proper team) announced a newer syntax for BuckleScript version 8.2. It isn't backwards-compatible. The BuckleScript compiler will continue to compile `.re` files written in the ReasonML syntax, but now there will be `.res` files that have a different syntax that's geared towards being more JS developer-friendly. Then they announced they're rebranding as _ReScript_. So the BuckleScript name is dead, except that it isn't. You still need to install `bsb` and `bs-platform` to run the compiler to take your new ReScript syntax, which is still OCaml under the hood, and compile it to JavaScript. They don't have `rescript` packages for you to install _yet_. The standard library is still called Belt, which was a naming scheme to work with the BuckleScript name. Support for the new syntax in the `refmt` code formatter (think Prettier) and the syntax highlighters for code editors isn't ready yet (as of September 2020).

If you were going to help someone learn Reason, what would you even tell them to learn? There's Reason, ReScript (which everthing around it is still named after BuckleScript), and the Reason and ReScript teams have vastly different goals at this point in time (and for the forseeable future as well). Reason and ReScript have syntaxes that are mostly the same, but aren't interchangble. Reason and OCaml code can be translated 1-to-1. ReScript can convert Reason syntax straight to ReScript syntax, so there's a path forward. But if you want to have native code and browser-focused code that shares the same logic, you're now forced to have different syntaxes and filetypes floating around in the same project. It's a mess. Maybe if the ReScript team waited to announce everything all at once instead of parsing out changes and updates once a week over a period of months, the messaging and project direction wouldn't feel so incoherent. I believe they are a group of smart people that want to create a better alternative to TypeScript, but they're leaving the native story behind and the Reason community is going to fragment.

I think that at this point, it's best to look at Reason and ReScript as two different languages. They might look similar, but they have very different targets, and going forward, the JS-focused ReScript will only diverge further from native Reason. I think that in the long run, if you're targeting JavaScript, the changes being made in ReScript **make sense**. If you came to Reason looking for a functional language, the ReScript changes take the language away from FP. You'll still have immutable data, curried functions, and linked lists, but the linked list shorthand from Reason will be for arrays in ReScript with the new syntax for lists being longer to write. The ReScript team is not interested in the FP aspects of Reason. My fear is that over time, for the sake of making things easier for new people coming from JavaScript, the functional parts of Reason that were there when I found the language may continue to disappear.

[elm]: https://elm-lang.org
