export function join<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): readonly (T1 & T2)[] {
  const result: (T1 & T2)[] = []

  for (const f of foreign) {
    const found = primary.find(p => (p[primaryKey] as any) === f[foreignKey])
    if (found) {
      result.push({ ...f, ...found })
    }
  }

  return result
}

export function rightOuterJoin<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): any {
  const result: any = []

  for (const f of foreign) {
    const found = primary.find(p => (p[primaryKey] as any) === f[foreignKey])
    result.push({ ...f, ...found })
  }

  return result
}

export function leftOuterJoin<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): any {
  const result: any = []

  for (const p of primary) {
    const list = foreign.filter(f => (p[primaryKey] as any) === f[foreignKey])
    if (list.length === 0) {
      result.push({ ...p })
    } else {
      list.forEach(found => result.push({ ...p, ...found }))
    }
  }

  return result
}

function cmp<T, K extends keyof T>(keys: K[]) {
  return (a: T, b: T) => {
    for (const key of keys) {
      if (a[key] < b[key]) {
        return -1
      }
      if (a[key] > b[key]) {
        return 1
      }
    }

    return 0
  }
}

export function orderBy<T, K extends keyof T>(...keys: K[]) {
  return (arr: Iterable<T>): T[] => {
    return [...arr].sort(cmp<T, K>(keys))
  }
}
