import type { CResult } from '@srtp/result'

export type DbResult<T> = Promise<CResult<string, T>>
