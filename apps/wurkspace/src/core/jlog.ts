import { jstr } from './casts'

export const jlog = (o: unknown): void => {
  console.log(jstr(o))
}
