# ObjectFn

[![npm](http://img.shields.io/npm/v/objectfn.svg?style=flat)](https://badge.fury.io/js/objectfn) [![tests](http://img.shields.io/travis/jescalan/objectfn/master.svg?style=flat)](https://travis-ci.org/jescalan/objectfn) [![dependencies](http://img.shields.io/david/jescalan/objectfn.svg?style=flat)](https://david-dm.org/jescalan/objectfn) [![coverage](http://img.shields.io/coveralls/jescalan/objectfn.svg?style=flat)](https://coveralls.io/github/jescalan/objectfn)

`map`, `reduce`, `forEach`, and `filter` for plain objects. Lazy evaluation, supports functional and imperative syntax, no dependencies.

### Why should you care?

I wanted a library that has no dependencies and gives me the basic map/reduce/filter for use on objects. Any existing library I found has boatloads of dependencies, provides tons more extra tools, and/or is unmaintained. So here's `ObjectFn`, just for you!

Also, big props to [@declandewet](https://github.com/declandewet) for the initial implementation of this library!

### Requirements

- [Node.js v.6+](http://nodejs.org)

### Installation

Using a terminal:

```sh
$ npm install objectfn -S
```

### Usage

Usage is straightforward. Just import what you need and use it on an object.

#### Imperative style

Takes data first, callback last.

```js
const {map, reduce, filter, forEach} = require('objectfn')

const obj = { foo: 'bar', wow: 'doge' }

map(obj, (val) => val.toUpperCase())
// { foo: 'BAR', wow: 'DOGE' }

reduce(obj, (acc, val, key) => (acc[key.toUpperCase()] = val, acc), {})
// { FOO: 'bar', WOW: 'doge' }

filter(obj, (val, key) => key !== 'foo')
// { wow: 'doge' }

forEach(obj, console.log.bind(console))
// bar foo 0 { foo: 'bar', wow: 'doge' }
// doge wow 1 { foo: 'bar', wow: 'doge' }
```

#### Functional style

Takes callback first, data last. Each method is automatically curried.

```js
const {map, reduce, filter, forEach} = require('objectfn')

const obj = { foo: 'bar', wow: 'doge' }

const upcaseValues = map((val) => val.toUpperCase())
upcaseValues(obj)
// { foo: 'BAR', wow: 'DOGE' }

const upcaseKeys = reduce((acc, val, key) => (acc[key.toUpperCase()] = key, acc), {})
upcaseKeys(obj)
// { FOO: 'bar', WOW: 'doge' }

const ignoreFoo = filter((val, key) => key !== 'foo')
ignoreFoo(obj)
// { wow: 'doge' }

const logValues = forEach(console.log.bind(console))
logValues(obj)
// bar foo 0 { foo: 'bar', wow: 'doge' }
// doge wow 1 { foo: 'bar', wow: 'doge' }
```

### Method Signature

- Each callback has a method signature of `(value, key, index, object)` with the exception of `reduce`.
  - `value` is the current key's value
  - `key` is the current key's name
  - `index` is the 0-based index of the current key
  - `object` is the original object.
- `reduce` has a method signature of `(accumulator, value, key, index, object)`.
  - `accumulator` is any initial value onto which you want to iteratively reduce from `object`.

### Differences in `reduce`

In `objectfn`, the act of passing an accumulator to the `reduce` method is _required_, which is better for readability/accessibility (developer intentions are made more obvious), has no immediate disadvantages and is one of the two reasons `objectfn` is able to support both functional and imperative syntaxes.

This means that this will work:

```js
let obj = { one: 1, two: 2, three: 3, four: 4 }
reduce(obj, (acc, val) => acc + val, 0) // => 10
```

But this will not:

```js
let obj = { one: 1, two: 2, three: 3, four: 4 }
reduce(obj, (prevVal, currVal) => prevVal + currVal) // => wat?
```

### Binding `this`

`objectfn` offers no mechanism for binding the `this` context of the callback via the last parameter. This is one of two reasons why `objectfn` is able to support both functional and imperative syntaxes. If you want this behavior, it is still possible (and far more readable) to do so using `Function.prototype.bind`:

```js
map(obj, fn.bind(/* value to use as `this` goes here */))
```

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
