import type { QueryFunctionContext } from '@tanstack/react-query'
import axios from 'redaxios'

const str = (k: unknown) => (k as string | number | boolean).toString()

const join = (keys: readonly unknown[]) => keys.map(str).join('/')

export const get = async <Key extends readonly unknown[]>(
  query: QueryFunctionContext<Key>,
) => (await axios.get(join(['/api', ...query.queryKey]))).data
