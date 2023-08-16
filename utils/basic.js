export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function removeDuplicates(array, key) {
  const map = new Map()
  return array.filter((item) => {
    if (map.has(item[key])) {
      return false
    } else {
      map.set(item[key], true)
      return true
    }
  })
}

export function deepEqual(obj1, obj2, keys) {
  // check if the given value of keys are equal
  if (keys) {
    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
  } else {
    // every key should be the same
    keys = Object.keys(obj1)
    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
  }

  return true
}
