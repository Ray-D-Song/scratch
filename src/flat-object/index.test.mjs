import { describe, it, expect } from 'vitest'
import flat from './index.mjs'

describe('flat', () => {
  it('should flatten a simple nested object', () => {
    const input = {
      a: 1,
      b: {
        c: 2,
        d: 3
      }
    }
    
    const expected = {
      'a': 1,
      'b.c': 2,
      'b.d': 3
    }
    
    expect(flat(input)).toEqual(expected)
  })

  it('should handle deeply nested objects', () => {
    const input = {
      a: {
        b: {
          c: {
            d: 1
          }
        }
      }
    }
    
    const expected = {
      'a.b.c.d': 1
    }
    
    expect(flat(input)).toEqual(expected)
  })

  it('should handle multiple nested properties', () => {
    const input = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4
        }
      }
    }
    
    const expected = {
      'a': 1,
      'b.c': 2,
      'b.d.e': 3,
      'b.d.f': 4
    }
    
    expect(flat(input)).toEqual(expected)
  })

  it('should handle primitive values', () => {
    const input = {
      a: 1,
      b: 'string',
      c: true,
      d: null
    }
    
    const expected = {
      'a': 1,
      'b': 'string',
      'c': true,
      'd': null
    }
    
    expect(flat(input)).toEqual(expected)
  })

  it('should handle empty object', () => {
    const input = {}
    const expected = {}
    expect(flat(input)).toEqual(expected)
  })
})
