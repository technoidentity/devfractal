import type { Result, ResultType } from '@srtp/core'

export type DbResult<T> = Promise<ResultType<string, T>>
