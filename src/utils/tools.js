import lodash from 'lodash'

export function findMaxItem(arr) {
  // 遍历数组中对象的某个值，返回该值最大的对象
  const obj = lodash.maxBy(arr, 'id')
  return obj
}
