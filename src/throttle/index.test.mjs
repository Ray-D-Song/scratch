import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import throttle from './index.mjs';

describe('throttle', () => {
  beforeEach(() => {
    // 使用假的定时器
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 恢复真实的定时器
    vi.restoreAllMocks();
  });

  it('首次调用应该立即执行函数', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 首次调用
    throttledFn();
    
    // 函数应该立即被执行
    expect(mockFn).toBeCalledTimes(1);
  });

  it('在等待期间再次调用不应触发函数执行', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 首次调用
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    // 前进 50ms，还在等待时间内
    vi.advanceTimersByTime(50);
    
    // 再次调用
    throttledFn();
    
    // 函数不应再次被调用
    expect(mockFn).toBeCalledTimes(1);
  });

  it('等待时间结束后再次调用应触发函数执行', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 首次调用
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    // 前进 100ms，等待时间结束
    vi.advanceTimersByTime(100);
    
    // 再次调用
    throttledFn();
    
    // 函数应该再次被调用
    expect(mockFn).toBeCalledTimes(2);
  });

  it('在等待期间多次调用也只执行一次', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 首次调用
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    // 在等待时间内多次调用
    vi.advanceTimersByTime(30);
    throttledFn();
    
    vi.advanceTimersByTime(30);
    throttledFn();
    
    vi.advanceTimersByTime(30);
    throttledFn();
    
    // 函数仍然只应该被调用一次
    expect(mockFn).toBeCalledTimes(1);
  });

  it('等待时间结束后状态应重置为 idle', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 首次调用
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    // 前进 100ms，等待时间结束
    vi.advanceTimersByTime(100);
    
    // 再次调用
    throttledFn();
    
    // 函数应该再次被调用
    expect(mockFn).toBeCalledTimes(2);
  });

  it('应该正确处理 0ms 的等待时间', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 0);

    // 首次调用
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    // 即使等待时间为 0，也需要使用 advanceTimersByTime 推进定时器
    vi.advanceTimersByTime(0);
    
    // 再次调用
    throttledFn();
    
    // 函数应该再次被调用
    expect(mockFn).toBeCalledTimes(2);
  });

  it('应该正确处理连续多次的完整周期', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // 第一个周期
    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
    
    vi.advanceTimersByTime(50);
    throttledFn(); // 不应执行
    expect(mockFn).toBeCalledTimes(1);
    
    vi.advanceTimersByTime(50); // 完成第一个周期
    
    // 第二个周期
    throttledFn();
    expect(mockFn).toBeCalledTimes(2);
    
    vi.advanceTimersByTime(50);
    throttledFn(); // 不应执行
    expect(mockFn).toBeCalledTimes(2);
    
    vi.advanceTimersByTime(50); // 完成第二个周期
    
    // 第三个周期
    throttledFn();
    expect(mockFn).toBeCalledTimes(3);
  });
});
