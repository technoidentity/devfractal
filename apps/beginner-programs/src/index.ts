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
  height: number = 0,
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
  let arr = []
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
  let last = num % 10
  let secondLast = num % 100
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
  let arr = []
  for (let i = start; i <= stop; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}
