/**
 * @typedef {'idle' | 'wait'} Status
 */

/**
 * @param {Function} fn 
 * @param {number} wait 
 * @returns {Function}
 */
function debounce(fn, wait) {
  /**
   * @type {Status}
   */
  let status = 'idle'
  let timer = null
  return () => {
    if (status === 'wait')
      clearTimeout(timer)
    else
      status = 'wait'
    timer = setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }
}

export default debounce