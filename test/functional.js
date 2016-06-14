const test = require('ava')
const {map, reduce, filter, forEach} = require('..')
const obj = { foo: 'bar', doge: 'wow' }

test('forEach', (t) => {
  t.plan(2)
  forEach((v, k) => t.truthy(obj[k] === v), obj)
})

test('map', (t) => {
  const mapped = map((v, k) => v.toUpperCase(), obj)
  t.truthy(mapped.foo === 'BAR')
  t.truthy(mapped.doge === 'WOW')
})

test('filter', (t) => {
  const filtered = filter((v, k) => k !== 'doge', obj)
  t.truthy(filtered.foo === 'bar')
  t.falsy(filtered.doge === 'wow')
})

test('reduce', (t) => {
  const reduced = reduce((m, v, k) => m.push(v) && m, [], obj)
  t.truthy(reduced.length === 2)
  t.truthy(reduced[0] === 'bar')
  t.truthy(reduced[1] === 'wow')
})
