---
title: On Learning Rambda(x)
slug: on-learning-rambda-x
description: On-going journey to learn all the functions in Rambda(x)
image: "black-lamb.jpg"
date: 2020-01-22T15:00:00.000+00:00
tags:
  - fp
  - javascript
---

I've been getting into functional programming as a of late, mostly due to
having watched Kyle Simpson's course on Frontend Masters. I looked at a bunch
of FP libraries, but the one I settled on was
[Rambda](https://selfrefactor.github.io/rambda). It maintains most of
[Ramda's](https://ramdajs.com/) API but cuts out a lot of the possibly more
unnecessary stuff. This single blog post is my chronicle of learning Rambda
along with its extended version,
[Rambdax](https://selfrefactor.github.io/rambda).

## add/subtract

```typescript
add(a: number, b: number): number
subtract(a: number, b: number): number
```

Well, this is an easy one to get started with. The first time I saw `add` as a
function, I thought it was dumb, but once you realize you can do this:

```typescript
const add5 = R.add(5);
const result = add5(3); // 8
```

The power of functional programming really starts to shine.

## adjust

```typescript
adjust(i: number, replaceFn: Function, arr: T[]): T[]
```

This isn't a function I think I'd use a ton right away, but I can see how it
could be useful _someday_.

```typescript
R.adjust(1, v v.toUpperCase(), ['brandon', 'lee', 'pittman'])
// [ 'brandon', 'LEE', 'pittman' ]
```

Could be useful in a loop where you needed to act on each item in the array,
but then why not just use `map` and create a new array?

## all

```typescript
all(fn: Function, arr: T[]): boolean
```

This one reminds me of a `filter`-style function. Again, probably not useful on
its own, but useful when combined with other utilities.

```typescript
R.all(v v.length == 3, ['Bob', 'Tim', 'Sam'])
```

## allPass

```typescript
allPass(rules: Function[], input: any): boolean
```

First, set up rules like:

```typescript
var rules = {
  x x > 30
}

var over30 = R.allPass(rules)
```

Then pass an object to see if it passes.

```typescript
var brandon = { age: 36 };
var lisa = { age: 26 };
over30(brandon); // true
over30(lisa); // false

// Combine with all for fun and profit
var allOver30 = R.all(over30);
allOver30([brandon]); // true
allOver30([brandon, lisa]); // false
```

## always/indentiy

```typescript
always(x: any): Function
identity(x: T): T
```

Well, you just get a function that returns the thing you originaly gave it or
the thing itself.

```typescript
const brandon = R.always("Brandon");
brandon(); // 'Brandon
```

## and

It's like `&&`.

```typescript
R.and(1 > 0, 2 > 1); // true
R.and(1 > 0, 0 > 1); // false
```

## any

```typescript
any(condition: Function, arr: T[]): boolean
```

Does what it says on the tin.

```typescript
var greaterThan100 = x x > 100
R.any(greaterThan100, [99,100,110]) // true
```

## anyPass

The _any_ version of `allPass`.

## append/prepend

```typescript
append(valueToAppend: T, arr: T[]): T[]
prepend(x: T, arr: T[]): T[]
```

`push` and `unshift` for the FP kids.

## assoc

```typescript
assoc(prop: any, value: any, obj: object): object
```

Sets a key/value on an object. Can be broken up for flexibility.

```typescript
var person = { name: "John" };
var setAge = R.assoc("age");
var setAgeTo20 = setAge(20);
setAgeTo20(person); // {name: "John", age: 20}
```

## both/either

```typescript
both(firstCondition: Function, secondCondition: Function, input: any): boolean
either(firstCondition: Function, secondCondition: Function): Function
```

Like `allPass` and `anyPass`, but for two functions only. Pass functions as positional
parameters instead of as an array.

```typescript
R.either(v R.startsWith('B', v), v R.endsWith('n', v))('Lenny') // false
```

## clone

```typescript
clone(objOrArr: T|T[]): T|T[]
```

Let's clone some shit, boys! Deep cloning, to boot.

## compose/pipe

```typescript
compose(fn1: Function, ... , fnN: Function): any
pipe(fn1: Function, ... , fnN: Function): any
```

Combine functions into Megatron.

## complement/opposite

```typescript
complement(fn: Function): Function
opposite(fn: Function): Function
```

If the supplied function equals `true`, return `false`, and vice versa. Well
that's fun.

```typescript
const fn = (name name == 'Brandon')
fn('Brandon') // false
const fn('Sammy') // true
```

## concat

Just an FP version of the normal `Array.concat()`.

## curry

```typescript
curry(fn: Function): Function
```

Finally! On to the serious FP stuff. Combine functions into their full FP glory.

```typescript
const addFourNumbers = (a, b, c, d) a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
const result = g(4) // 10
```

## inc/dec

```typescript
R.inc(2); // 2
R.dec(2); // 1
```

`++` and `--` for FP folks.

## defaultTo

```typescript
defaultTo(defaultValue: T, ...inputArguments: any[]): T
```

Lets you set a default value. Great for when you need a fallback.

```typescript
const defaultToBrandon = R.defaultTo("Brandon");
var name;
defaultToBrandon(name); // 'Brandon'
name = "Bruce Wayne";
defaultToBrandon(name); // 'Bruce Wayne'
```

## dissoc

```typescript
dissoc(prop: any, obj: object): object
```

Returns an object without the specified key.

```typescript
var person = { name: "Brandon", age: 36 };
const removeAge = R.dissoc("age");
removeAge(person); // { name: 'Brandon' }
```

## divide

```typescript
R.divide(100, 5); // 20
```

## drop/dropLast/take

```typescript
drop(howManyToDrop: number, arrOrStr: T[]|string): T[]|String
dropLast(howManyToDrop: number, arrOrStr: T[]|String): T[]|String
take(num: number, arrOrStr: T[]|string): T[]|string
takeLast(num: number, arrOrStr: T[]|string): T[]|string
```

Removes the indicated number of items or characters from the provided array or
string.

```typescript
var numbers = [1, 2, 3];
R.drop(2, numbers); // [3]
R.dropLast(2, numbers); // [1]
```

## startsWith/endsWith

```typescript
startsWith(x: string, str: string): boolean
endsWith(x: string, str: string): boolean
```

Checks if a string starts or ends with a provided string. **Regex not allowed.**

```typescript
var name = "Brandon";
R.startsWith("B", name); // true
R.endsWith("n", name); // true
```

## equals

```typescript
equals(a: any, b: any): boolean
```

Checks equality even in objects.

```typescript
R.equals([1, { a: 2 }, [{ b: 3 }]], [1, { a: 2 }, [{ b: 3 }]]); // true
```

## F/T

Always returns `false` or `true`.

## filter

```typescript
filter(filterFn: Function, x: Array|Object): Array|Object
```

`filter`, but with the parameters reversed.

```typescript
const filterBrandon = R.filter(v v.toLowerCase() != 'brandon')
filterBrandon(['Brandon']) // []
filterBrandon(['Brandon', 'Lisa']) // ['Lisa']
```

## find and its variants

```typescript
find(findFn: Function, arr: T[]): T|undefined
findIndex(findFn: Function, arr: T[]): number
findLast(findFn: Function, arr: T[]): T|undefined
findLastIndex(findFn: Function, arr: T[]): number
```

`find`, but with the parameters reversed. `findIndex` will return `-1` if
nothing can be matched. `findLast` is the inverse of `find`. `findLastIndex` is
the inverse of `findIndex`.

```typescript
var fn = v v > 5
R.find(fn, [1,2,3,4,6]) // 6
```

## flatten

```typescript
flatten(arr: any[]): any[]
```

Like a pancake, yo.

```typescript
R.flatten([1, [2, [3]]]); // [ 1, 2, 3 ]
```

## flip

```typescript
flip(fn: Function): Function
```

Returns a copy of the provided function with its parameters in reverse.

```typescript
const subtractFlip = R.flip(R.subtract);
const result = subtractFlip(1, 7); // 6
```

## forEach

```typescript
forEach(fn: Function, x: Array|Object): Array|Object
```

Good ol' forEach for FP folks.

## fromPairs

```typescript
fromPairs(list: any[]): object
```

Equivalent to `Object.fromEntries`.

## groupBy

```typescript
groupBy(fn: Function, arr: Array): Object
```

Takes the supplied function to test array items and assign to generated key.

```typescript
people = [{first: 'Brandon', last: 'Pittman'}, {first: 'Lisa', last: 'Jones'}]
R.groupBy(x x.last.toLowerCase(), people)
// {
//  Pittman: [ { first: 'Brandon', last: 'Pittman' } ],
//  Jones: [ { first: 'Lisa', last: 'Jones' } ]
// }
```

## groupWith

```typescript
groupWith(fn: Function, arr: Array): Array
```

Takes the supplied function to test array items and group them when they
satisfy the predicate function.

## has

```typescript
has(prop: string, obj: Object): boolean
```

Check is an object has a particular property.

```typescript
R.has("name", { name: "Brandon" }); // true
```

## head/tail

```typescript
head(arrOrStr: T[]|string): T|string
tail(arrOrStr: T[]|string): T[]|string
```

Head to tail carnivores favorite functions.

## identical

```typescript
identical(a: any, b: any): boolean
```

Is we both the same ting?

## ifElse

```typescript
ifElse(condition: Function|boolean, ifFn: Function, elseFn: Function): Function
```

Evaluates second fn if first fn is true, else it evaluates the third fn.

```typescript
var fn = R.ifElse(
  x x.toLowerCase() == 'brandon',
  _ 'Cool guy',
  _ 'Not as cool'
)
fn('Brandon') // "Cool guy"
```

## includes

```typescript
includes(valueToFind: T|string, input: T[]|string): boolean
```

Next level `includes`.

```typescript
R.includes("oo", "foo"); // true
R.includes({ a: 1 }, [{ a: 1 }]); // true
```

## indexBy

```typescript
indexBy(condition: Function|String, arr: T[]): Object
```

Generates an object with items from array that match the provided function or
object path string.

```typescript
const arr = [ {id: 1}, {id: 2} ]
const result = R.indexBy(
  x x.id,
  arr
)
const pathResult = R.indexBy(
  'id',
  arr
)
// { 1: {id: 1}, 2: {id: 2} }
```

## indexOf/lastIndexOf

```typescript
indexOf(valueToFind: any, arr: T[]): number
lastIndexOf(x: any, arr: T[]): number
```

Like `findIndex` for a specific value, not a function. Returns `-1` if not
found.

```typescript
R.indexOf(1, [1, 2]); // 0
R.indexOf(0, [1, 2]); // -1
```

## init

```typescript
init(arrOrStr: T[]|string): T[]|string
```

Opposite of `tail()`.

```typescript
R.init([1, 2, 3]); // [1, 2]
R.init("foo"); // 'fo'
```

## is/isNil/isEmpty

```typescript
is(xPrototype: any, x: any): boolean
isNil(x: any): boolean
isEmpty(x: any): boolean
```

`is` checks against `instanceof`, but doesn't seem to work with `Array`.

```typescript
R.is(String, "foo"); // true
```

## join

```typescript
oin(separator: string, arr: T[]): string
```

Good ol' `join`.

## keys

```typescript
keys(x: Object): string[]
```

`Object.keys()`

## last

```typescript
last(arrOrStr: T[]|string): T|string
```

Opposite of `head`.

## length

```typescript
length(arrOrStr: Array|String): Number
```

The usual `length`.

## map

```typescript
map(mapFn: Function, x: Array|Object): Array|Object
```

`map` for FP people. Works on `Object`s as well.

## match

```typescript
match(regExpression: Regex, str: string): string[]
```

`String.match`, yo.

## max/maxBy/min/minBy

```typescript
max(x: Number|String, y: Number|String): Number|String
maxBy(fn: Function, x: Number|String, y: Number|String): Number|String
min(x: Number|String, y: Number|String): Number|String
minBy(fn: Function, x: Number|String, y: Number|String): Number|String
```

Self-explanatory.

## merge/mergeRight

```typescript
merge(a: Object, b: Object)
mergeRight(a: Object, b: Object)
```

`Object.assign`.

## modulo

```typescript
modulo(a: number, b: number):numberNumber
```

Remainder of a/b.

## multiply

```typescript
multiply(a: number, b: number): number
```

You know…

## not

```typescript
not(x: any): boolean
```

`!` as a function.

````typescript
R.not(true) // false

## omit

```typescript
omit(propsToOmit: string[]|string, obj: Object): Object
````

`R.dissoc` for multiple keys.

```typescript
R.omit("a,c,d", { a: 1, b: 2, c: 3 }); // {b: 2}
```

## path

```typescript
path(pathToSearch: string[]|string, obj: Object): any
```

Grab a value from an object by path string.

```typescript
R.path("a.b", { a: { b: 1 } }); // 1
```

## pathOr

```typescript
pathOr(defaultValue: any, pathToSearch: string[]|string, obj: Object): any
```

Like `path` but lets you provide a default value, kinda like `defaultTo`.

```typescript
R.pathOr(1, "a.b", { a: { b: 2 } }); // 2
R.pathOr(1, ["a", "b"], { a: { b: 2 } }); // 2
R.pathOr(1, ["a", "c"], { a: { b: 2 } }); // 1
```

## partial

```typescript
partial(fn: Function, ...inputs: any[]): Function | any
```

Like `curry`, but you can pre-supply arguments.

```typescript
const fn = (salutation, title, firstName, lastName) {
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!'
}

const canPassAnyNumberOfArguments = partial(fn, 'Hello', 'Ms.')
const finalFn = canPassAnyNumberOfArguments('foo')

finalFn('bar') //  'Hello, Ms. foo bar!'
```

## partialCurry

```typescript
partialCurry(fn: Function|Async, partialInput: Object, input: Object): Function|Promise
```

It's like `partial`, but it lets you use an object and its keys instead of
positional parameters.

```typescript
var fn = { first, middle, last }`${first} ${middle} ${last}`;
var start = R.partialCurry(fn, { first: "Brandon" });
var final = start({ middle: "Lee", last: "Pittman" }); // "Brandon Lee Pittman"
```

## pick

```typescript
pick(propsToPick: string[], obj: Object): Object
```

An grab just what you need from an object.

```typescript
me = { first: "Brandon", middle: "Lee", last: "Pittman" };
R.pick(["first", "last"], me);
// { first: 'Brandon', last: 'Pittman' }
```

## pluck

```typescript
pluck(property: string, arr: Object[]): any[]
```

Kinda like pick, but you're pulling specific key off of each object in an array.

```typescript
b = { first: "Brandon", last: "Pittman" };
l = { first: "Lisa", last: "Jones" };
people = [b, l];
R.pluck("first", people); // [ 'Brandon', 'Lisa' ]
```

## prop

```typescript
prop(propToFind: string, obj: Object): any
```

`Object[prop]` as a Function.

```typescript
b = { first: "Brandon", last: "Pittman" };
R.prop("first", b); // "Brandon"
```

## propEq

```typescript
propEq(propToFind: string, valueToMatch: any, obj: Object): boolean
```

Checks if the provided prop equals the value given against a provide object.

```typescript
b = { first: "Brandon", last: "Pittman" };
R.propEq("first", "Brandon", b); // true
```

## propIs

```typescript
propIs(type: any, name: string, obj: Object): boolean
```

Checks type of prop.

```typescript
b = { first: "Brandon", last: "Pittman" };
R.propIs(String, "first", b);
```

## propOr

```typescript
propOr(defaultValue: any, param: string, obj: Object): any
```

`prop()` but with a fallback.

```typescript
R.propOr("Brandon Pittman", "name", b); // "Brandon Pittman"
```

## range

```typescript
range(start: number, end: number): number[]
```

Returns an array of numbers starting with `start` and going up to `end`.

```typescript
R.range(0, 3); // [0,1,2]
```

## reduce

```typescript
reduce(iteratorFn: Function, accumulator: any, array: T[]): any
```

Good ol' `reduce`.

## reject

```typescript
reject(fn: Function, arr: T[]): T[]
```

Opposite of `filter`.

## repeat

```typescript
repeat(valueToRepeat: T, num: number): T[]
```

Works like Ruby's `#times` method.

```typescript
R.repeat("brandon", 2); // ['brandon', 'brandon']
```

## replace

```typescript
replace(strOrRegex: string|Regex, replacer: string, str: string): string
```

`String.replace()`, essentially.

## reverse

```typescript
reverse(str: T[]): T[]
```

`String.reverse()`, essentially.

## slice

```typescript
slice(list: T[], from: Number, to: Number)
```

`Array.prototype.slice`!!!

## sort

```typescript
sort;
```

`Array.prototype.sort`!!!

## sortBy

```typescript
sortBy;
```

Sort but can take object props.

## split

```typescript
split(separator: string, str: string): string[]
```

`String.split()`

## splitEvery

```typescript
splitEvery(sliceLength: number, arrOrString: T[]|string): T[T[]]|string[]
```

`String.split`, but split by length rather than a specific string.

## sum

```typescript
sum(listOfNumbers: number[]): number
```

Handy `sum` so you don't need to write your own with `reduce`.

## tap

```typescript
tap(fn: Function, input: T): T
```

Runs the function but returns the input.

## test

```typescript
test(regExpression: Regex, str: string): boolean
```

Like an assertion.

## times

```typescript
times(fn: Function, n: number): T[]
```

Runs the function `n` number of times. Passes the current iteration number to
the function.

```typescript
R.times(R.identity, 5); // [0, 1, 2, 3, 4]
```

## toLower/toUpper

```typescript
toLower(str: string): string
toUpper(str: string): string
```

Saving characters.

## toPairs

```typescript
toPairs(obj: object): any[]
```

`Object.toEntries()`.

## toString

```typescript
toString(x: any): string
```

Yup.

## transpose

```typescript
transpose(input: Array): Array
```

Spreads arrays out across new arrays.

```typescript
const input = [[10, 11], [20], [], [30, 31, 32]];
const expected = [[10, 20, 30], [11, 31], [32]];
const result = R.transpose(input);
// result === expected
```

## trim

```typescript
trim(str: string): string
```

`String.trim()`

## type

```typescript
type(a: any): string
```

Returns type of argument; is async function and promise aware.

## uniq/uniqWith

```typescript
uniq(arr: T[]): T[]
uniqWith(fn: Function, arr: T[]): T[]
```

Returns an array with just uniq elements. No more Array.from(new Set(...))!

```typescript
R.uniq([1, 1, 2, 1]); // [1, 2]
```

## uniqWith

```typescript
uniqWith(fn: Function, arr: T[]): T[]
```

Like `adjust`, without needing a function.

```typescript
R.update(0, "foo", ["bar", "baz"]); // ['foo', baz]
```

## values

```typescript
values(obj: Object): Array
```

`Object.values()`

## without

```typescript
without(a: T[], b: T[]): T[]
```

Return array minus the supplied values.

```typescript
R.without([1, 2], [1, 2, 3, 4]);
// [3, 4]
```

## zip/zipObj

```typescript
zip(a: K[], b: V[]): Array
```

Unlike `transpose`, `zip` will end after the shortest list is done.

```typescript
R.zip([1, 2, 3, 4], ["A", "B"]);
// [[1, 'A'], [2, 'B']]
R.zipObj(["a", "b", "c"], [1, 2]);
// {a: 1, b: 2}
```

## Review

Whew! That wraps up all the function is **Rambda**. A lot of them are utility
functions you've used in vanilla JS or with another utility library like
Lodash. There aren't a ton of FP-specific functions, but the way they are
structured, they are perfect for programming in a functional style. Now, onto
the stuff just in **Rambdax**. Those functions are the more interesting ones as
far as I'm concerned.

## {all,any}{False,True,Type}

```typescript
allFalse(...inputs: any|predicate[]): boolean
allTrue(...inputs: any|predicate[]): boolean
allType(targetType: string): (...inputs: any[]) => boolean
anyFalse(...inputs: any|predicate[]): boolean
anyTrue(...inputs: any|predicate[]): boolean
anyType
```

Acts like a filter function for various cases.

## change

```typescript
change(origin: object, path: string, changeData: any): object
```

Update an object using a path syntax. Will dynamically create sub-keys as
needed.

```typescript
var me = {};
R.change(me, "name.last", "Pittman");
// { name: { last: 'Pittman' } }
```

## composeAsync/pipedAsync

```typescript
composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise
pipedAsync(input: any, ...fns: Array<Function|Async>): Promise
```

Like `compose`, but supports using async functions.

## composed/piped

```typescript
composed(...fnList: any[]): any
piped(...fnList: any[]): any
```

`compose` but lets you pass the input as the final parameter.
`pipe` but lets you pass the input as the first parameter.

```typescript
const result = composed(
  R.map((x) => x * 10),
  R.filter((x) => x > 1),
  [1, 2, 3]
);
// => [20, 30]
```

## debounce

```typescript
debounce(fn: Function, ms: number): any
```

Maybe someday I'll remember the difference between this and `throttle`.

> Creates a debounced function that delays invoking fn until after wait
> milliseconds ms have elapsed since the last time the debounced function was
> invoked.

## defaultToStrict

```typescript
defaultToStrict(defaultValue: T, ...inputArguments: any[]): T
```

Like the regular `defaultTo`, but ya know, stricter.

```typescript
R.defaultToStrict("foo", undefined); // => 'foo'
R.defaultToStrict("foo", 1); // => 'foo'
R.defaultToStrict("foo", {}); // => 'foo'
R.defaultTo("foo", undefined, 1, [], {}); // => 'foo'
R.defaultTo("foo", undefined, 1, [], {}, "bar"); // => 'bar'
```

## defaultToWhen

```typescript
defaultToWhen(fallback: any, fn: Function, ...inputArguments: any[]): any
```

Returns the fallback if no argument passes the predicate function.

```typescript
const fn = (x) => x > 2;
const fallback = 10;
const result = R.defaultToWhen(fallback, fn, 1, 6, 8, 0);
// result is 6
```

## delay

```typescript
delay(ms: number): Promise
```

It's a wait function. Should be used in an async function.

```typescript
const result = R.delay(1000);
// `result` resolves to `'RAMBDAX_DELAY'`
```

## filterAsync

```typescript
filterAsync(predicate: Async, iterateOver: object|array): Promise
```

`filter`, but async.

## findInObject

```typescript
findInObject(fn: Function, obj: object): object
```

Like `Array.find` but for objects. Only returns the first match.

```typescript
b = { first: "Brandon" };
R.findInObject((v, k) => v.length > 6, b);
// { prop: 'first', value: 'Brandon' }
```

## getter/setter/reset

```typescript
getter(key: undefined|string|string[]): any
setter(key: string|object, value?: any): void
reset(): void
```

Use Rambdax's cache object.

```typescript
R.setter("name", "Brandon");
R.getter("name"); // "Brandon"
R.reset(); // everything's undefined now
```

## glue

```typescript
glue(input: string, glueString?: string): string
```

It's like `join` but for strings.

## hasPath

```typescript
hasPath(input: string|string[], input: object): boolean
```

Checks to see if the provided path exists on the object.

## headObject

```typescript
headObject(input: object): {prop: string, value: T}
```

Takes an object with just one key and returns a new object with a `prop` and
`value` set of keys.

```typescript
var double = (x) => x * 2;
R.headObject({ double }); // { prop: 'double', value: [Function] }
```

## includesType

```typescript
includesType(targetType: string, list: any[]): boolean
```

`Array.includes` but checks if a type is the same.

```typescript
const result = R.includesType("String", [1, 2, "foo"]); // true
```

## inject

```typescript
inject(injection: string, marker: string, str: string, beforeFlag: boolean): string
```

Injects the `inject` string after (or before with `true`) the `MARKER`
location. Seems like it would be better to replace the marker.

```typescript
R.inject("Lee", "MIDDLE", "Brandon MIDDLE Pittman", true); // "Brandon LeeMIDDLE Pittman"
```

## isAttach

```typescript
isAttach(): boolean
```

Bolts on an `is` method to object-like variables to let you check type.

```typescript
R.isAttach();
const foo = [1, 2, 3];
const result = foo.is(["number"]); // => true
```

## isFalsy

```typescript
isFalsy(x: any): boolean
```

Checks if falsy. Oddly, no `isTruthy` to be found.

## isFunction

```typescript
isFunction(x: any): boolean
```

## isNil

```typescript
isNil(x: any): boolean
```

`null` or `undefinded`?

## isPromise

```typescript
isPromise(x: any): boolean
```

## isType

```typescript
isType(xType: string, x: any): boolean
```

Seems to be the same as `R.is`.

## isValid

```typescript
isValid({ input: object: schema: object }): boolean
```

Lets you run validation checks against a schema! Simply returns `false` if not
valid. **Doesn't throw.**

[Full `isValid` docs](https://github.com/selfrefactor/rambdax/blob/master/files/isValid.md).

_Also, [superstruct](https://github.com/ianstormtaylor/superstruct) is a thing._

```typescript
// as of 2020-01-28
var brandon = { name: "Brandon Pittman", married: false };
R.isValid({ input: brandon, schema: { name: String, married: Boolean } });
```

## maybe

```typescript
maybe(ifRule: Boolean, whenIf: T, whenElse: T): T
```

Acts like ternary operator. Recommended when dealing with nested ternary
operator usage. Doesn't require the stems to be functions.

```typescript
const x = 4;
const y = 8;
const result = R.maybe(x > 2, y > 10 ? 3 : 7, 5); // result == 7
```

## mapAsync/mapFastAsync

```typescript
mapAsync(fn: Async|Promise, arr: Array): Promise
mapFastAsync(fn: Async|Promise, arr: Array): Promise
```

Async mapping operations; sequentially or in parallel. Best used with
`composeAsync`.

## memoize

```typescript
memoize(fn: Function|Promise): any
```

Returns cached result of provided function.

## mergeAll

```typescript
mergeAll(input: Object[]): Object
```

Merges all objects in the array sequentially.

## mergeDeep

```typescript
mergeDeep(slave: object, master: object): object
```

Deeply merge objects, master object's keys win.

## nextIndex

```typescript
nextIndex(index: number, list: any[]): number
```

Returns the next index of the list, but loops back to 0 when reaching the end.

## ok

```typescript
ok(...inputs: any[]): (schemas: any[]) => true | Error
```

`R.isValid`-style checks, but throws error if validation fails.

```typescript
const result = R.ok(1, ["foo", "bar"])("number", ["string"]);
// true
```

## once

```typescript
once(fn: Function): Function
```

Returns a function that can only ever be invoked once.

## otherwise

```typescript
otherwise(fallback: Function, toResolve: Promise): Promise
```

Catches and handles errors inside `compose` and `pipe` calls. Returns
`identity` if no error occurs.

## pathEq

```typescript
pathEq(path:string|string[], target: any, obj: object): boolean
```

Checks for equality at `path`.

```typescript
const result = R.pathEq("a.b", 1, { a: { b: 1 } }); // true
```

## pass

```typescript
pass(...inputs: any[]): (schemas: any[]) => boolean
```

Like `R.ok`, but doesn't throw, just returns false.

## partition

```typescript
partition(predicate: Function, input: Array|Object): [Array|Object, Array|Object]
```

Like `filter`, but returns two arrays &mdash; one with passing items and one
with rejected items.

## produce

```typescript
produce(conditions: Object, input: any): Promise|Object
```

Passes `input` to each function in the object.

```typescript
const conditions = {
  foo: (a) => a > 10,
  bar: (a) => ({ baz: a }),
};

const result = R.produce(conditions, 7);

const expectedResult = {
  foo: false,
  bar: { baz: 7 },
}; // result === expectedResult
```

## promiseAllObject

```typescript
promiseAllObject(promises: Object): Promise
```

Loops over promises in an object.

## random

```typescript
random(min: number, max: number): number
```

Returns a random number. Duh.

## remove

```typescript
remove(inputs: string|RegExp[], text: string): string
```

Removes each string in the provided array from the input text.

```typescript
const result = remove(["foo", "bar"], "foo bar baz foo"); // 'baz foo'
```

## renameProps

```typescript
renameProps(rules: Object, input: Object): Object
```

Renames the keys on an object.

```typescript
const rules = {
  f: "foo",
  b: "bar",
};
const input = {
  f: 1,
  b: 2,
};
const result = R.renameProps(rules, input);
const expectedResult = {
  foo: 1,
  bar: 2,
}; // result === expectedResult
```

## resolve

```typescript
resolve(afterResolve: Function, toResolve: Promise): Promise
```

Turns a composition asynchronous.

```typescript
const expected = {
  firstName: "FIRST_NAME_FOO",
  lastName: "LAST_NAME_FOO",
};

const fetchMember = async (x) => {
  await R.delay(200);

  return {
    a: 1,
    firstName: `FIRST_NAME_${x.query}`,
    lastName: `LAST_NAME_${x.query}`,
  };
};

const getMemberName = pipe(
  (email) => ({ query: email }),
  fetchMember,
  resolve(pick("firstName,lastName"))
);
const result = await getMemberName("FOO");
// result === expected
```

## s

```typescript
s(): undefined
```

Lets you chain function calls.

```typescript
R.s(); // true
"foo".s(R.toUpper); // "FOO"
```

## sortObject

```typescript
sortObject(predicate: Function, obj: Object): Object
```

Allows you to sort an object using its props and values.

```typescript
const predicate = (propA, propB, valueA, valueB) => (valueA > valueB ? -1 : 1);
const sorted = R.sortObject(predicate, { a: 1, b: 4, c: 2 });
// {b:4, c: 2, a:1}
```

## shuffle

```typescript
shuffle(arr: T[]): T[]
```

Just like Icky Woods.

## switcher

A chainable switch statement. Must have a `.default()` call at the end.

```typescript
const valueToMatch = { foo: 1 };

const result = R.switcher(valueToMatch)
  .is("baz", "is baz")
  .is((x) => typeof x === "boolean", "is boolean")
  .is({ foo: 1 }, "Property foo is 1")
  .default("is bar");

console.log(result); // => 'Property foo is 1'
```

## tapAsync

```typescript
tapAsync(fn: Function|Async|Promise, inputArgument: T): T
```

Like `tap`, but accepts an async function.

## template

```typescript
template(input: string, templateInput: object): string
```

Lets you to Handlebars-style templating with the input providing the values to evaluate.

[Currently waiting to see if PR is accepted to allow for blanket JS evaluations.](https://github.com/selfrefactor/rambdax/pull/46)

## toDecimal

```typescript
toDecimal(num: number, charsAfterDecimalPoint: number): number
```

Convert number to decimal number.

```typescript
R.toDecimal(2.45464, 2); // 2.45
```

## throttle

```typescript
throttle(fn: Function, period: number): Function
```

Creates a function that will only be called once every `n` milliseconds.

## tryCatch

```typescript
tryCatch(fn: Async|Function, fallback: any): Function
```

Will return `fallback` if `fn` throws an error.

## unless

```typescript
unless(rule: Function|boolean, whenFalse: Function|any): Function
```

Inverse of an `if`.

```typescript
const result = R.unless(R.isNil, R.inc)(1); // 2
```

## wait

```typescript
wait(fn: Async): Promise<[any, Error]>
```

Returns a promise that resolves to an array with a return value and an error, a
la Go.

```typescript
void (async function wait() {
  const [result, err] = await R.wait(R.delay(1000));
  // => err is undefined
  // => result is `RAMBDAX_DELAY`
})();
```

## waitFor

```typescript
waitFor(condition: any, ms: number): Promise
```

Gives you a promise that resolves to true if the provided function returns true
without the alloted amount of time.

## where

```typescript
where(conditions: object, input: object): boolean
```

Returns a function that takes an object and validates each prop.

```typescript
const condition = R.where({
  a: (aProp) => typeof aProp === "string",
  b: (bProp) => bProp === 4,
});

const result = condition({
  a: "foo",
  b: 4,
  c: 11,
}); // true
```

## whereEq

```typescript
whereEq(rule: object, input: any): boolean
```

Validates object values against a `rule` object.

## when

```typescript
when(rule: Function|boolean, whenTrue: Function|any): Function
```

If as a Function&trade;. Passes input value through if it doesn't meet the rule.

```typescript
const truncate = R.when(
  (x) => x.length > 5,
  R.compose((x) => `${x}...`, R.take(5))
);

const result = truncate("12345678");
// '12345...'
```

## whenAsync

```typescript
whenAsync(rule: condition: Async | Function | boolean, whenFn: Async | Function): Promise
```

Async version of `when`.

## Wrap-Up

Well, I did it. I went through all the functions. Did I memorize them all?
Probably not. But I learned a great deal about the library and I'm starting to
see places in my own code where I could use it more and more. I even made a PR
to enhance the `template` function. Sadly, the response time from the
maintainer is a little slower than I'd like. I also found a handful of places
in the docs where they weren't 100% accurate. Rambda doesn't have the user base
that Ramda does, so it's natural that the docs don't get quite the same level
of attention, but hopefully, Rambda continues receiving love and care in the
future.
