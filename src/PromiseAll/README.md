# 实现 Promise.all
Promise.all 方法的参数是一个 Promise 数组，返回一个新的 Promise 对象，其值是参数数组中所有 Promise 对象的值的数组。

```js
const promises = [
  new Promise((resolve) => setTimeout(() => resolve('foo'), 300)),
  new Promise((resolve) => setTimeout(() => resolve('bar'), 100)),
]

Promise.all(promises).then((result) => {
  console.log(result) // ['foo', 'bar']
})

// or await
const result = await Promise.all(promises)
console.log(result) // ['foo', 'bar']
```
