import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import debounce from './index.mjs';

describe('debounce', () => {
  beforeEach(() => {
    // 使用假的定时器
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 恢复真实的定时器
    vi.restoreAllMocks();
  });

  it('应该在指定时间后调用函数', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 调用 debounced 函数
    debouncedFn();
    
    // 刚调用时，原函数不应该被执行
    expect(mockFn).not.toBeCalled();
    
    // 前进 99ms，原函数仍不应该被执行
    vi.advanceTimersByTime(99);
    expect(mockFn).not.toBeCalled();
    
    // 再前进 1ms，达到 100ms，原函数应该被执行一次
    vi.advanceTimersByTime(1);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('多次调用时应该只执行最后一次', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 首次调用
    debouncedFn();
    
    // 前进 50ms
    vi.advanceTimersByTime(50);
    
    // 再次调用，应该重置定时器
    debouncedFn();
    
    // 前进 99ms，原函数仍不应该被执行
    vi.advanceTimersByTime(99);
    expect(mockFn).not.toBeCalled();
    
    // 再前进 1ms，达到从第二次调用开始的 100ms，原函数应该被执行一次
    vi.advanceTimersByTime(1);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('应该在最后一次调用后等待指定时间执行函数', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 连续多次调用
    debouncedFn();
    vi.advanceTimersByTime(30);
    
    debouncedFn();
    vi.advanceTimersByTime(30);
    
    debouncedFn();
    vi.advanceTimersByTime(30);
    
    // 此时仍未达到最后一次调用后的 100ms
    expect(mockFn).not.toBeCalled();
    
    // 再前进 70ms，达到最后一次调用后的 100ms
    vi.advanceTimersByTime(70);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('idle 状态调用一次后应变为 wait 状态', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 调用一次
    debouncedFn();
    
    // 前进 100ms 使函数执行
    vi.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(1);
    
    // 再次调用
    debouncedFn();
    
    // 前进 100ms 使函数再次执行
    vi.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('应该正确处理 0ms 的等待时间', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 0);

    debouncedFn();
    
    // 即使等待时间为 0，也需要使用 advanceTimersByTime 推进定时器
    vi.advanceTimersByTime(0);
    expect(mockFn).toBeCalledTimes(1);
  });
});
