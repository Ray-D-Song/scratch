/**
 * @param {Array} arr 
 */
function count(arr) {
  let res = {}
  for (let i = 0; i < arr.length; i++) {
    (res[arr[i]]) ?
      res[arr[i]]++ : res[arr[i]] = 1
  }
  return res
}

export default count