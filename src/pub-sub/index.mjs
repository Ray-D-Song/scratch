/**
 * 实现两个 API
 * mitt.on(event, callback)   表示 订阅者监听
 * mitt.emit(event, data) 表示 发布者发送
 */

const mitt = {
  bucket: {
  },
  /**
   * @param {string} event 
   * @param {function(*) void} callback 
   */
  on(event, callback) {
    const cbs = this.bucket[event]
    if (!cbs)
      this.bucket[event] = []
    this.bucket[event].push(callback)
  },
  /**
   * @param {string} event 
   * @param {*} data 
   */
  emit(event, data) {
    const cbs = this.bucket[event]
    if (!cbs) return
    if (cbs.length === 0) return
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](data)
    }
  }
}

export default mitt