export const flip =
  (f: (...args: unknown[]) => unknown) =>
  (...args: unknown[]) =>
    f(...args.reverse())
