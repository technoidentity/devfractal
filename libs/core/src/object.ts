export function get<T extends object, K extends keyof T>(obj: T, key: K): T[K]

export function get<T extends object, K extends keyof T, K2 extends keyof T[K]>(
  obj: T,
  key: K,
  key2: K2,
): T[K][K2]

export function get<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
>(obj: T, key: K, key2: K2, key3: K3): T[K][K2][K3]

export function get<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
  K4 extends keyof T[K][K2][K3],
>(obj: T, key: K, key2: K2, key3: K3, key4: K4): T[K][K2][K3][K4]

export function get<T extends object>(obj: T, ...keys: string[]): any {
  let result: any = obj
  for (const key of keys) {
    result = result[key]
  }

  return result
}

export function set<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T

export function set<T extends object, K extends keyof T, K2 extends keyof T[K]>(
  obj: T,
  key: K,
  key2: K2,
  value: T[K][K2],
): T

export function set<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
>(obj: T, key: K, key2: K2, key3: K3, value: T[K][K2][K3]): T

export function set<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
  K4 extends keyof T[K][K2][K3],
>(obj: T, key: K, key2: K2, key3: K3, key4: K4, value: T[K][K2][K3][K4]): T

export function set<T extends object>(obj: T, ...args: any[]): T {
  let result: any = { ...obj }
  for (let i = 0; i < args.length - 1; i += 1) {
    result = result[args[i]]
  }
  result[args[args.length - 1]] = args[args.length - 1]

  return result
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    result[key] = obj[key]
  }

  return result
}

export function pluck<T extends object, K extends keyof T>(
  arr: T[],
  key: K,
): T[K][] {
  return arr.map(x => x[key])
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result: any = {}
  for (const key of Object.keys(obj)) {
    const k = key as K
    if (!keys.includes(k)) {
      result[k] = obj[k]
    }
  }

  return result as Omit<T, K>
}

export function merge<T1, T2>(obj: T1, obj2: T2): T1 & T2 {
  return { ...obj, ...obj2 }
}

export function buildObject<T extends object, K extends keyof T, V>(
  obj: T,
  f: (value: T[K], key: K) => V,
): Record<K, V> {
  const result = {} as Record<K, V>
  for (const key of Object.keys(obj) as K[]) {
    result[key] = f(obj[key], key)
  }

  return result
}

export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
