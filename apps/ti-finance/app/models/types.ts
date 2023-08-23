import type { CResult } from '@srtp/core'

export type DbResult<T> = Promise<CResult<string, T>>
