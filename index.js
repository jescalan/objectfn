// curry the callWithReorderedArgs function
const flippable = curry(callWithReorderedArgs)

// export argument-flippable auto-curried methods
exports.map = flippable(curry(map))
exports.filter = flippable(curry(filter))
exports.reduce = flippable(curry(reduce))
exports.forEach = flippable(curry(forEach))

/**
 * Iterates over an object's keys, applying a transform function to each value.
 * @param  {Function} transform - the transform function. Receives `(value, key, index, object)` as arguments.
 * @param  {Object}   obj       - the initial object
 * @return {Object}             - the new object
 */
function map (transform, obj) {
  let res = {}
  let index = 0
  for (let [val, key] of entries(obj)) {
    res[key] = transform(val, key, index++, obj)
  }
  return res
}

/**
 * Iterates over an object's keys, applying a predicate function that determines whether the current key will appear in the returned object.
 * @param  {Function} predicate - the predicate function. Receives `(value, key, index, object)` as arguments. Should return `true` or `false`.
 * @param  {Object}   obj       - the initial object
 * @return {Object}             - the new object
 */
function filter (predicate, obj) {
  let res = {}
  let index = 0
  for (let [val, key] of entries(obj)) {
    if (predicate(val, key, index++, obj)) {
      res[key] = val
    }
  }
  return res
}

/**
 * Iterates over an object's keys, calling an iterator function on each pass.
 * @param  {Function} iterate - the iterator function. Recives `(value, key, index, object)` as arguments.
 * @param  {Object}   obj     - the initial object
 */
function forEach (iterate, obj) {
  let index = 0
  for (let [val, key] of entries(obj)) {
    iterate(val, key, index++, obj)
  }
}

/**
 * Iterates over an object's keys, applying a reducer function on each pass that reduces the current parameters into a single value.
 * @param  {Function} reducer     - the reducer function. Receives `(accumulator, value, key, index, object)` as arguments.
 * @param  {*}        accumulator - a value to accumulate results into.
 * @param  {Object}   obj         - the initial object.
 * @return {*}                    - the combined accumulated value.
 */
function reduce (reducer, accumulator, obj) {
  let index = 0
  for (let [val, key] of entries(obj)) {
    accumulator = reducer(accumulator, val, key, index++, obj)
  }
  return accumulator
}

/**
 * Lazily iterates over an object's keys, yielding each current value and key as a [value, key] array.
 * @param  {Object}                   obj - the initial object
 * @return {iterable.<Array<String>>}     - an iterable of arrays containing object's [value, key]
 */
function * entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [obj[key], key]
  }
}

/**
 * Calls a function with supplied arguments - if first argument (`obj`) is not a function, it is moved to the end of the argument list.
 * @param  {Function} fn       - a function to call
 * @param  {*}        firstArg - the first argument
 * @param  {*}        args...  - the rest of the arguments
 * @return {*}                 - the result of calling `fn()` with supplied args
 */
function callWithReorderedArgs (fn, firstArg, ...args) {
  return typeof firstArg === 'function'
    ? fn(firstArg, ...args)
    : fn(...args, firstArg)
}

/**
 * Accepts a function, returning a function that partially-applies itself when there are missing arguments.
 * @param  {Function} fn - the function to curry
 * @return {Function}    - the curried function.
 */
function curry (fn) {
  const partial = (...args) => args.length < fn.length
    ? (...partialArgs) => partial(...args.concat(partialArgs))
    : fn(...args)
  return partial
}
