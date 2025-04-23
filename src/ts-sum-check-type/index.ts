function sum<T extends string | number>(arg1: T, arg2: T) {
  if (typeof arg1 === 'string' && typeof arg2 === 'string')
    return Number(arg1) + Number(arg2)
  else if (typeof arg1 === 'number' && typeof arg2 === 'number')
    return arg1 + arg2
  else throw new Error('typeof arg1 and arg2 not match')
}
