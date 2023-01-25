import { fns } from '@srtp/api'
import { getAuth } from './getAuth'

const r = fns(getAuth)
export const api = r.api
export const secured = r.secured
