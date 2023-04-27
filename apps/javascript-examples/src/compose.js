export const compose =
  (f, ...fns) =>
  (...args) => {
    let r = f(...args)
    for (const gf of fns) {
      r = gf(r)
    }

    return r
  }
