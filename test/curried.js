const test = require('ava')
const {map, reduce, filter, forEach} = require('..')
const obj = { foo: 'bar', doge: 'wow' }

test('forEach', (t) => {
  t.plan(2)
  const fn = forEach((v, k) => t.truthy(obj[k] === v))
  fn(obj)
})

test('map', (t) => {
  const fn = map((v, k) => v.toUpperCase())
  const mapped = fn(obj)
  t.truthy(mapped.foo === 'BAR')
  t.truthy(mapped.doge === 'WOW')
})

test('filter', (t) => {
  const fn = filter((v, k) => k !== 'doge')
  const filtered = fn(obj)
  t.truthy(filtered.foo === 'bar')
  t.falsy(filtered.doge === 'wow')
})

test('reduce', (t) => {
  const fn = reduce((m, v, k) => m.push(v) && m, [])
  const reduced = fn(obj)
  t.truthy(reduced.length === 2)
  t.truthy(reduced[0] === 'bar')
  t.truthy(reduced[1] === 'wow')
})
