# ObjectFn

[![npm](http://img.shields.io/npm/v/objectfn.svg?style=flat)](https://badge.fury.io/js/objectfn) [![tests](http://img.shields.io/travis/jescalan/objectfn/master.svg?style=flat)](https://travis-ci.org/jescalan/objectfn) [![dependencies](http://img.shields.io/david/jescalan/objectfn.svg?style=flat)](https://david-dm.org/jescalan/objectfn) [![coverage](http://img.shields.io/coveralls/jescalan/objectfn.svg?style=flat)](https://coveralls.io/github/jescalan/objectfn)

Map, reduce, forEach, and filter for objects. Lazy evaluation, no dependencies.

### Why should you care?

I wanted a library that has no dependencies and gives me the basic map/reduce/filter for use on objects. Any existing library I found has boatloads of dependencies, provides tons more extra tools, and/or is unmaintained. So here's `ObjectFn`, just for you!

Also, big props to [@declandewet](https://github.com/declandewet) for the initial implementation of this library!

### Installation

`npm install objectfn -S`

> **Note:** This project is compatible with node v6+ only

### Usage

Very straightforward usage. Just import what you need and use it on an object.

```js
const {map, reduce, filter, forEach} = require('objectfn')

const obj = { foo: 'bar', wow: 'doge' }

map(obj, (val, key) => val.toUpperCase())
// { foo: 'BAR', wow: 'DOGE' }

reduce(obj, (accum, val, key) => accum[val.toUpperCase()] = key && accum }, {})
// { FOO: 'bar', WOW: 'doge' }

filter(obj, (val, key) => !key === 'foo')
// { wow: 'doge' }

forEach(obj, console.log.bind(console))
// logs out all the values
```

Each callback has a method signature of `(value, key, index, object)` with the exception of `reduce`, which has `(accumulator, value, key, index, object)`. `value` is the current key's value, `key` is the current key's name, `index` is the 0-based index of the current key and `object` is the original object.

**Note:** Unlike the native array equivalent as well as other library implementations, we felt it would be better to explicitly require the passing of an accumulator to the `reduce` method.

This means that this will work:

```js
let obj = { one: 1, two: 2, three: 3, four: 4 }
reduce(obj, (accum, val) => accum + val, 0) // => 10
```

But this will not:

```js
let obj = { one: 1, two: 2, three: 3, four: 4 }
reduce(obj, (prevVal, currVal) => prevVal + currVal) // => wat?
```

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
