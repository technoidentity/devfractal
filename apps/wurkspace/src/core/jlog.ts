import { jstr } from '@srtp/core'

export const jlog = (o: unknown): void => {
  console.log(jstr(o))
}
