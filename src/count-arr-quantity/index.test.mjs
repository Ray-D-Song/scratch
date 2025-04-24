import { describe, it } from 'vitest';
import count from './index.mjs';
import { expect } from 'vitest';

describe('count', () => {
  it('应该返回正确的数量', () => {
    const arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
    const result = count(arr)
    expect(result).toEqual({
      apple: 3, banana: 2, orange: 1
    })
  })
})