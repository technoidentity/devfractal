export const compose =
  (
    f: (...args: unknown[]) => unknown,
    ...g: ((x: unknown) => unknown)[]
  ): any =>
  (...args: any[]) => {
    let r = f(...args)
    for (const gf of g) {
      r = gf(r)
    }

    return r
  }
