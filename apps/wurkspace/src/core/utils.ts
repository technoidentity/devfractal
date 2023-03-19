import { isStr } from '@srtp/spec'
import { jlog } from '@srtp/core'

export const logIfError = (error?: unknown) => {
  if (!error) {
    return
  }
  if (isStr(error)) {
    console.error(error)
  } else {
    jlog(error)
  }
}
