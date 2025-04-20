/**
 * @typedef {'idle' | 'wait'} State
 */

/**
 * @param {Function} fn 
 * @param {number} wait 
 */
function throttle(fn, wait) {
  /**
   * @type {State}
   */
  let state = 'idle'
  let timer = null
  return () => {
    if (state === 'wait')
      return
    fn()
    state = 'wait'
    timer = setTimeout(() => {
      state = 'idle'
      clearTimeout(timer)
      timer = null
    }, wait)
  }
}

export default throttle