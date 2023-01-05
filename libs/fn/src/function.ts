import { isFloat } from '@srtp/core'
export function delay(fun: () => void, millis: number): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fun())
      } catch (err) {
        reject(err)
      }
    }, millis)
  })
}

export function once(fun: (...args: any[]) => void): (...args: any[]) => void {
  let called = false
  let result: any

  return (...args: any[]) => {
    if (!called) {
      called = true
      result = fun(...args)
    }
    return result
  }
}

// getRandomNumber is a utility function to get random number
export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

//  random function
export function random(lower: number, upper: number, floating = false): number {
  let randomNum
  if (floating || isFloat(lower) || isFloat(upper)) {
    randomNum = getRandom(lower, upper)
  } else {
    randomNum = Math.floor(getRandom(Math.ceil(lower), Math.floor(upper)))
  }

  return randomNum
}
