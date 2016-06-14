'use strict'

exports.map = function map (obj, transform) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    res[key] = transform(val, key, obj)
  }
  return res
}

exports.filter = function filter (obj, predicate) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    if (predicate(val, key, obj)) {
      res[key] = val
    }
  }
  return res
}

exports.forEach = function forEach (obj, iterate) {
  for (let [val, key] of entries(obj)) {
    iterate(val, key, obj)
  }
}

exports.reduce = function reduce (obj, reducer, accumulator) {
  for (let [val, key] of entries(obj)) {
    accumulator = reducer(accumulator, val, key, obj)
  }
  return accumulator
}

function * entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [obj[key], key]
  }
}
