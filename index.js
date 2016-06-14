function * entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [obj[key], key]
  }
}

function map (obj, cb) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    res[key] = cb(val, key, obj)
  }
  return res
}

function filter (obj, cb) {
  let res = {}
  for (let [val, key] of entries(obj)) {
    if (cb(val, key, obj)) {
      res[key] = val
    }
  }
  return res
}

function forEach (obj, cb) {
  for (let [val, key] of entries(obj)) {
    cb(val, key, obj)
  }
}

function reduce (obj, cb, init) {
  for (let [val, key] of entries(obj)) {
    init = cb(init, val, key, obj)
  }
  return init
}

module.exports = {map, reduce, filter, forEach}
