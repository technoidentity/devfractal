export function pick<T extends object, K extends keyof T>(
  obj: T,
  paths: readonly K[],
): Pick<T, K> {
  const resObj = {} as any

  for (const path of paths) {
    if (path in obj) {
      resObj[path] = obj[path]
    }
  }
  return resObj
}

export function pickBy<T>(
  obj: Record<string, any>,
  predicate: (value: T) => boolean,
): object {
  const resultObj: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    if (predicate(obj[key])) {
      resultObj[key] = obj[key]
    }
  }
  return resultObj
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  paths: readonly K[],
): Omit<T, K> {
  const resObj = {} as any

  for (const key of Object.keys(obj)) {
    if (!paths.includes(key as K)) {
      resObj[key] = obj[key as K]
    }
  }

  return resObj
}

//  omitBy function
export function omitBy<T>(
  obj: Record<string, any>,
  predicate: (value: T) => boolean,
): object {
  const resultObject: Record<string, any> = {}

  for (const key of Object.keys(obj)) {
    if (!predicate(obj[key])) {
      resultObject[key] = obj[key]
    }
  }

  return resultObject
}

//  pluck function
export function pluck<T extends object, K extends keyof T>(
  objArray: T[],
  paths: readonly K[],
): Pick<T, K>[] {
  const resultArray: Pick<T, K>[] = []
  for (const item of objArray) {
    resultArray.push(pick(item, paths))
  }

  return resultArray
}

export function mergeWith<T extends object>(
  fst: T,
  snd: any,
  fn: (x: any, y: any) => any,
): Record<keyof T, number> {
  const result: any = {}
  for (const [key, value] of Object.entries(fst)) {
    if (snd.hasOwnProperty(key)) {
      const val = fn((fst as any)[key], snd[key])
      result[key] = val
    } else {
      result[key] = value
    }
  }
  for (const [key, value] of Object.entries(snd)) {
    if (!result.hasOwnProperty(key)) {
      result[key] = value
    }
  }
  return result
}
