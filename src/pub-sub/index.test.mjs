import { describe, it, expect } from 'vitest'
import mitt from './index.mjs'

describe('mitt', () => {
  it('should register event listener and emit event', () => {
    const data = { message: 'hello' }
    let received = null
    
    mitt.on('test', (payload) => {
      received = payload
    })
    
    mitt.emit('test', data)
    expect(received).toEqual(data)
  })

  it('should handle multiple listeners for same event', () => {
    const data = 'test message'
    const results = []
    
    mitt.on('multiple', (payload) => {
      results.push(payload + '1')
    })
    
    mitt.on('multiple', (payload) => {
      results.push(payload + '2')
    })
    
    mitt.emit('multiple', data)
    expect(results).toEqual(['test message1', 'test message2'])
  })

  it('should do nothing when emitting event with no listeners', () => {
    expect(() => {
      mitt.emit('nonexistent', 'some data')
    }).not.toThrow()
  })

  it('should handle different data types', () => {
    const testCases = [
      123,
      'string',
      { key: 'value' },
      [1, 2, 3],
      true,
      null
    ]

    testCases.forEach(testData => {
      let received = null
      mitt.on('dataType', (payload) => {
        received = payload
      })
      mitt.emit('dataType', testData)
      expect(received).toEqual(testData)
    })
  })
})
