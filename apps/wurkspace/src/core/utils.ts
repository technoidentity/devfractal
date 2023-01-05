import { isStr } from '@srtp/core'
import { jlog } from './jlog'

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
