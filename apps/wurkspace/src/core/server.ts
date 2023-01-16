import { fns } from '@srtp/next'
import { getAuth } from './getAuth'

const r = fns(getAuth)
export const api = r.api
export const secured = r.secured
