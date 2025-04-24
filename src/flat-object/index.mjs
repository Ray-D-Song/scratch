/**
 * @param {object} target 
 */
function flat(target) {
  const res = {}
  process(target, [], res)
  return res
}

/**
  * @param {*} item 需要被递归处理的元素
  * @param {Array<string>} 前置路径数组
  * @param {Object} 结果
  */
const process = (item, arr, res) => {
  if (isObject(item))
    Object.keys(item).forEach(i => process(item[i], arr.concat(i), res))
  else res[arr.join('.')] = item
}

/**
 * 
 * @param {*} variable 
 * @returns {boolean}
 */
function isObject(variable) {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}

export default flat