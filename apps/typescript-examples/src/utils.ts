export const tap =
  (msg?: string) =>
  <T>(x: T): T => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`tap(${msg ?? ''}): ${x}`)
    return x
  }

export const bool = (e: any) => !!e
