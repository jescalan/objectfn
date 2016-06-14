'use strict'

const test = require('ava')
const {map, reduce, filter, forEach} = require('..')
const obj = { foo: 'bar', doge: 'wow' }

test('forEach', (t) => {
  t.plan(2)
  forEach(obj, (v, k) => t.truthy(obj[k] === v))
})

test('map', (t) => {
  const mapped = map(obj, (v, k) => v.toUpperCase())
  t.truthy(mapped.foo === 'BAR')
  t.truthy(mapped.doge === 'WOW')
})

test('filter', (t) => {
  const filtered = filter(obj, (v, k) => k !== 'doge')
  t.truthy(filtered.foo === 'bar')
  t.falsy(filtered.doge === 'wow')
})

test('reduce', (t) => {
  const reduced = reduce(obj, (m, v, k) => m.push(v) && m, [])
  t.truthy(reduced.length === 2)
  t.truthy(reduced[0] === 'bar')
  t.truthy(reduced[1] === 'wow')
})
