export type GetPrismaOneType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>

export type GetPrismaListType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>[number]
