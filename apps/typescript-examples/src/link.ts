export type Link<T> = {
  value: T
  next: Link<T> | undefined
  prev: Link<T> | undefined
}
