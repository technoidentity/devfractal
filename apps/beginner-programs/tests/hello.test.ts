import { expect, test } from 'vitest'
import {
  convertToCelsius,
  convertToFahrenheit,
  FizzBuzz,
  isEven,
  isOdd,
  ordinalSuffix,
  printAsciiTable,
  // ordinalSuffix,
  rectangle,
} from '../src'
test('temperature conversion', () => {
  expect(convertToCelsius(0)).toBeCloseTo(-17.78)
  expect(convertToCelsius(180)).toBeCloseTo(82.22)
  expect(convertToFahrenheit(0)).toEqual(32)
  expect(convertToFahrenheit(100)).toEqual(212)
  expect(convertToCelsius(convertToFahrenheit(15))).toEqual(15)
})

test('Odd Even', () => {
  expect(isOdd(42)).toBeFalsy()
  expect(isOdd(9999)).toBeTruthy()
  expect(isOdd(-10)).toBeFalsy()
  expect(isOdd(-11)).toBeTruthy()
  expect(isOdd(3.1415)).toBeFalsy()
  expect(isEven(42)).toBeTruthy()
  expect(isEven(9999)).toBeFalsy()
  expect(isEven(-10)).toBeTruthy()
  expect(isEven(-11)).toBeFalsy()
  expect(isEven(3.1415)).toBeFalsy()
})

test('Rectangle Area & volume', () => {
  expect(rectangle(10, 10, 10)).toEqual({
    area: 100,
    perimeter: 40,
    surfaceArea: 600,
    volume: 1000,
  })
  expect(rectangle(9999, 0, 9999)).toEqual({
    area: 0,
    perimeter: 19998,
    surfaceArea: 199960002,
    volume: 0,
  })
  expect(rectangle(5, 8, 10)).toEqual({
    area: 40,
    perimeter: 26,
    surfaceArea: 340,
    volume: 400,
  })
})

test('Fizz Buzz', () => {
  expect(FizzBuzz(35)).toEqual([
    1,
    2,
    'Fizz',
    4,
    'Buzz',
    'Fizz',
    7,
    8,
    'Fizz',
    'Buzz',
    11,
    'Fizz',
    13,
    14,
    'FizzBuzz',
    16,
    17,
    'Fizz',
    19,
    'Buzz',
    'Fizz',
    22,
    23,
    'Fizz',
    'Buzz',
    26,
    'Fizz',
    28,
    29,
    'FizzBuzz',
    31,
    32,
    'Fizz',
    34,
    'Buzz',
  ])
})

test('Ordinal suffix', () => {
  expect(ordinalSuffix(0)).toEqual('0th')
  expect(ordinalSuffix(1)).toEqual('1st')
  expect(ordinalSuffix(2)).toEqual('2nd')
  expect(ordinalSuffix(3)).toEqual('3rd')
  expect(ordinalSuffix(4)).toEqual('4th')
  expect(ordinalSuffix(10)).toEqual('10th')
  expect(ordinalSuffix(11)).toEqual('11th')
  expect(ordinalSuffix(12)).toEqual('12th')
  expect(ordinalSuffix(13)).toEqual('13th')
  expect(ordinalSuffix(14)).toEqual('14th')
  expect(ordinalSuffix(101)).toEqual('101st')
})

test('print ascii table', () => {
  expect(printAsciiTable(32, 126)).toEqual([
    ' ',
    '!',
    '"',
    '#',
    '$',
    '%',
    '&',
    "'",
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '[',
    '\\',
    ']',
    '^',
    '_',
    '`',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '{',
    '|',
    '}',
    '~',
  ])
})
