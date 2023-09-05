import { describe, expect, it } from 'vitest'
import { sstr, snum, sint, sbool, notNil } from './typeCasts'

describe('typeCasts', () => {
  describe('sstr', () => {
    it('should cast a string', () => {
      expect(sstr('hello')).toBe('hello')
    })

    it('should throw an error if the input is not a string', () => {
      expect(() => sstr(123)).toThrow()
    })
  })

  describe('snum', () => {
    it('should cast a number', () => {
      expect(snum(123)).toBe(123)
    })

    it('should throw an error if the input is not a number', () => {
      expect(() => snum('123')).toThrow()
    })
  })

  describe('sint', () => {
    it('should cast a number to an integer', () => {
      expect(sint(123)).toBe(123)
    })

    it('should throw an error if the input is not a number', () => {
      expect(() => sint('123')).toThrow()
    })

    it('should throw an error if the input is not an integer', () => {
      expect(() => sint(123.45)).toThrow()
    })
  })

  describe('sbool', () => {
    it('should cast a boolean', () => {
      expect(sbool(true)).toBe(true)
    })

    it('should throw an error if the input is not a boolean', () => {
      expect(() => sbool('true')).toThrow()
    })
  })

  describe('notNil', () => {
    it('should return the input if it is not null or undefined', () => {
      expect(notNil('hello')).toBe('hello')
    })

    it('should throw an error if the input is null', () => {
      expect(() => notNil(null)).toThrow()
    })

    it('should throw an error if the input is undefined', () => {
      expect(() => notNil(undefined)).toThrow()
    })
  })
})
