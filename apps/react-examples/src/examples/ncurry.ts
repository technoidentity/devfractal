export const ncurry = (
  f: (...args: unknown[]) => unknown,
  n: number = f.length,
): any => {
  if (n === 0) {
    return f
  }

  return (...args: unknown[]) => {
    if (args.length < n) {
      return ncurry(f.bind(null, ...args), n - args.length)
    }

    return f(...args)
  }
}
