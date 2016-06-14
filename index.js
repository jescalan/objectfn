'use strict'

/**
 * Iterates over an object's keys, applying a transform function to each value.
 * @param  {Object}   obj       - the initial object
 * @param  {Function} transform - the transform function. Receives `(value, key, object)` as arguments.
 * @return {Object}             - the new object
 */
exports.map = function map (obj, transform) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    res[key] = transform(val, key, obj)
  }
  return res
}

/**
 * Iterates over an object's keys, applying a predicate function that determines whether the current key will appear in the returned object.
 * @param  {Object}   obj       - the initial object
 * @param  {Function} predicate - the predicate function. Receives `(value, key, object)` as arguments. Should return `true` or `false`.
 * @return {Object}             - the new object
 */
exports.filter = function filter (obj, predicate) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    if (predicate(val, key, obj)) {
      res[key] = val
    }
  }
  return res
}

/**
 * Iterates over an object's keys, calling an iterator function on each pass.
 * @param  {Object}   obj     - the initial object
 * @param  {Function} iterate - the iterator function. Recives `(value, key, object)` as arguments.
 */
exports.forEach = function forEach (obj, iterate) {
  for (let [val, key] of entries(obj)) {
    iterate(val, key, obj)
  }
}

/**
 * Iterates over an object's keys, applying a reducer function on each pass that reduces the current parameters into a single value.
 * @param  {Object}   obj         - the initial object.
 * @param  {Function} reducer     - the reducer function. Receives `(accumulator, value, key, object)` as arguments.
 * @param  {*}        accumulator - a value to accumulate results into.
 * @return {*}                    - the combined accumulated value.
 */
exports.reduce = function reduce (obj, reducer, accumulator) {
  for (let [val, key] of entries(obj)) {
    accumulator = reducer(accumulator, val, key, obj)
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
