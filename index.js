function * entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [obj[key], key]
  }
}

function map (obj, cb) {
  let newObj = {}
  for (let [val, key] of entries(obj)) {
    newObj[key] = cb(val, key, obj)
  }
  return newObj
}

function filter (obj, cb) {
  let newObj = {}
  for (let [val, key] of entries(obj)) {
    if (cb(val, key, obj)) {
      newObj[key] = val
    }
  }
  return newObj
}

function forEach (obj, cb) {
  for (let [val, key] of entries(obj)) {
    cb(val, key, obj)
  }
}

function reduce (obj, cb, init) {
  let first = arguments.length > 2
  for (let [val, key] of entries(obj)) {
    if (!first) {
      init = val
      first = true
    } else {
      init = cb(init, val, key, obj)
    }
  }
  return init
}

module.exports = {map, reduce, filter, forEach}
