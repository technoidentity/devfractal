export const flip =
  f =>
  (...args) =>
    f(...args.reverse())
