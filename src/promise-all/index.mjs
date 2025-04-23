/**
 * 
 * @param {Array<Promise>} promises 
 * @returns {Promise<Array>} 
 */
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const promiseArr = Array.from(promises)
    const len = promiseArr.length
    // 参数为空数组时即刻 resolve
    if (len === 0) {
      resolve([])
    }
    const result = Array.from({
      length: len
    })
    let completeCount = 0
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i])
        .then((val) => {
          result[i] = val
          completeCount++
          if (completeCount === len)
            resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    }
  }) 
}

export default PromiseAll