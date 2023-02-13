import type { Result } from '@srtp/core'

export type DbResult<T> = Promise<Result<string, T>>
