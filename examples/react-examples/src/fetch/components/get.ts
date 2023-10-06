import { axios, joinPaths, urlcat } from '@srtp/web'
import type { QueryFunctionContext } from '@tanstack/react-query'

export const rqGet = async <Key extends readonly unknown[]>(
  query: QueryFunctionContext<Key>,
) => {
  const keys = query.queryKey as unknown as string[]

  return (
    await axios({
      method: 'get',
      url: urlcat('/api', joinPaths(keys)),
    })
  ).data
}
