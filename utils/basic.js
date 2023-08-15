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

export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
