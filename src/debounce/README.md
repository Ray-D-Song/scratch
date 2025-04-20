# 防抖（debounce）
防抖函数会在设定的时间 n 后执行，如果在这段时间内多次调用，则重新计时。
例如，假设用户在 100 毫秒内点击了 5 次按钮。防抖技术不会让这些点击中的任何一个执行对应的回调函数。一旦用户停止点击，如果去抖时间为 100 毫秒，则回调函数将在 100 毫秒后执行。因此，肉眼看来，防抖就像将多个事件组合成一个事件一样。

```js
// debounce(fn, wait)

// 使用
const fn = debounce(() => {
  console.log('Hello, world!')
}, 1000)

fn()
await new Promise((resolve) => setTimeout(resolve, 500))
fn()
```

以上调用只会输出一次 `Hello, world!`。