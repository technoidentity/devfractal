import invariant from 'tiny-invariant'

// problem 2
export const convertToCelsius = (temp: number): number => (temp - 32) * (5 / 9)
export const convertToFahrenheit = (temp: number): number => temp * (9 / 5) + 32

// problem 3
export const isOdd = (num: number): boolean => {
  let convertedNum = num
  if (Math.sign(num) === -1) {
    convertedNum = Math.abs(num)
  }
  return convertedNum % 2 === 1
}

export function compact<T extends readonly unknown[]>(arr: T): T {
  return arr.filter(x => !!x) as any as T
}

export function chunks<T>(size: number) {
  return (arr: readonly T[]): T[][] => {
    invariant(size > 0, 'size must be > 0')

    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }

    return result
  }
}

export const isEven = (num: number) => num % 2 === 0

// problem 4

interface Rectangle {
  area?: number
  perimeter?: number
  volume?: number
  surfaceArea?: number
}

export const rectangle = (
  length: number,
  width: number,
  height = 0,
): Rectangle => {
  const area = length * width
  const perimeter = 2 * (length + width)
  const volume = length * width * height
  const surfaceArea =
    length * width * 2 + length * height * 2 + width * height * 2

  return { area, perimeter, volume, surfaceArea }
}

// Problem 5

export const FizzBuzz = (num: number): any => {
  const arr = []
  for (let i = 1; i <= num; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      arr.push('FizzBuzz')
    } else if (i % 3 === 0) {
      arr.push('Fizz')
    } else if (i % 5 === 0) {
      arr.push('Buzz')
    } else {
      arr.push(i)
    }
  }
  return arr
}

// Problem 6

export const ordinalSuffix = (num: number): any => {
  const last = num % 10
  const secondLast = num % 100
  if (last === 1 && secondLast !== 11) {
    return num + 'st'
  } else if (last === 2 && secondLast !== 12) {
    return num + 'nd'
  } else if (last === 3 && secondLast !== 13) {
    return num + 'rd'
  } else {
    return num + 'th'
  }
}

// Problem 7

export const printAsciiTable = (start: number, stop: number) => {
  const arr = []
  for (let i = start; i <= stop; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

// Problem 9

export const getChessSquareColor = (column: number, row: number) => {
  // invariant(column >= 0 && column < 8, '')
  if ((row + column) % 2 === 0) {
    return 'white'
  } else {
    return 'black'
  }
}

// Problem 10

export const indexOf = (text: string, word: string) => {
  for (let i = 0; i < text.length; i += 1) {
    let j = 0
    for (; j < word.length; j += 1) {
      if (text[i + j] !== word[j]) {
        break
      }
    }
    if (j === word.length) {
      return i
    }
  }
  return -1
}

export const findAndReplaceOne = (
  text: string,
  oldStr: string,
  matchStr: string,
) => {
  const idx = indexOf(text, oldStr)

  return text.slice(0, idx) + matchStr + text.slice(idx + matchStr.length)
}

export const stringEquality = (str1: string, str2: string) => {
  for (let i = 0; i < str1.length; i += 1) {
    if (str1[i] !== str2[i]) {
      return false
    }
  }
  return true
}

export const subStr = (text: string, idx1: number, idx2: number) => {
  let result = ''
  for (let i = idx1; i < idx2; i += 1) {
    result += text[i]
  }
  return result
}

export const getSubStr = (
  text: string,
  idx1: number,
  idx2: number,
  idx3: number,
) => {
  let word1 = ''
  let word2 = ''
  for (let i = idx1; i < idx2; i += 1) {
    word1 += text[i]
  }
  for (let j = idx2; j < idx3; j += 1) {
    word2 += text[j]
  }
  return [word1, word2]
}

export const getSubStrNew = (
  text: string,
  idx1: number,
  idx2: number,
  idx3: number,
) => {
  const word1 = subStr(text, idx1, idx2)
  const word2 = subStr(text, idx2, idx3)
  return [word1, word2]
}

export const partitions = (text: string, num: number) => {
  const result = []
  for (let i = 0; i < text.length; i += num) {
    result.push(text.slice(i, i + num))
  }
  return result
}

export function partition<T>(f: (v: T) => boolean) {
  return (arr: readonly T[]): [readonly T[], readonly T[]] => {
    const result: [T[], T[]] = [[], []]
    for (const e of arr) {
      result[f(e) ? 0 : 1].push(e)
    }
    return result
  }
}

export const subStrAll = (text: string, indices: number[]) => {
  const result = []
  let j = 0
  for (let i = 0; i < text.length && j < indices.length; i += indices[i]) {
    result.push(subStr(text, i, indices[j]))
    j++
  }
  return result
}

export const findAndReplaceAll = (
  text: string,
  oldStr: string,
  matchStr: string,
) => {
  let result = ''
  let i = 0
  while (i < text.length) {
    let j = 0
    for (; j < oldStr.length; j += 1) {
      if (text[i + j] !== oldStr[j]) {
        result += text[i]
        break
      }
    }
    if (j === oldStr.length) {
      result += matchStr
      i = i + j - 1
    }
    i++
  }
  return result
}

// console.log(findAndReplaceAll('foofoxbarfoxfizzfox', 'fox', 'dog'))
// console.log(findAndReplaceAll('foxfox', 'fox', 'dog'))
// console.log(stringEquality('dogg', 'dogg'), 'fn')
// console.log(subStr('hello world new', 4, 9))
// console.log(getSubStr('hello world new', 2, 5, 8))
// console.log(partition('helloworldnew', 4))
// console.log(subStrAll('helloworldfrom', [1, 5, 9]), 'hello')

// Problem 11

export const getHoursMinutesSeconds = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const hrs = Math.floor(seconds / (60 * 60))
  const mins = hrs % 60
  const secs = mins % 60

  if (hrs !== 0) {
    const mins = hrs % 60
    if (mins !== 0) {
      if (secs !== 0) {
        return `${hrs}s ${mins}m ${secs}s`
      }
    }
  }
  return ''
}
