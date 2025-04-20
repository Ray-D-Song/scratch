import { describe, it, expect } from 'vitest';
import PromiseAll from './index.mjs';

describe('PromiseAll', () => {
  it('应该正确处理空数组', async () => {
    const result = await PromiseAll([]);
    expect(result).toEqual([]);
  });

  it('应该正确处理所有 Promise 都成功的情况', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];
    const result = await PromiseAll(promises);
    expect(result).toEqual([1, 2, 3]);
  });

  it('应该保持结果顺序与输入 Promise 数组一致', async () => {
    const promises = [
      new Promise(resolve => setTimeout(() => resolve(3), 30)),
      new Promise(resolve => setTimeout(() => resolve(1), 10)),
      new Promise(resolve => setTimeout(() => resolve(2), 20))
    ];
    const result = await PromiseAll(promises);
    expect(result).toEqual([3, 1, 2]);
  });

  it('应该处理非 Promise 值', async () => {
    const values = [1, Promise.resolve(2), 3];
    const result = await PromiseAll(values);
    expect(result).toEqual([1, 2, 3]);
  });

  it('当任一 Promise 失败时应该拒绝', async () => {
    const error = new Error('测试错误');
    const promises = [
      Promise.resolve(1),
      Promise.reject(error),
      Promise.resolve(3)
    ];
    
    await expect(PromiseAll(promises)).rejects.toThrow(error);
  });

  it('应该处理 iterables 而不仅仅是数组', async () => {
    // 使用 Set 作为可迭代对象
    const set = new Set([Promise.resolve(1), Promise.resolve(2)]);
    const result = await PromiseAll(set);
    expect(result).toEqual([1, 2]);
  });
});
