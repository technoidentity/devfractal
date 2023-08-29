import type { z } from 'zod'

import { useLocalStorage, type LocalStorageResult } from './useLocalStorage'

type Base = Record<string, z.ZodTypeAny>

export type LocalStorageHooks<Obj extends Base> = {
  [K in keyof Obj as `use${Capitalize<K & string>}`]: (
    initialValue: z.infer<Obj[K]>,
  ) => LocalStorageResult<Obj[K]>
}

export function localStorage<Obj extends Base>(
  obj: Obj,
): LocalStorageHooks<Obj> {
  const result = {} as any
  for (const key of Object.keys(obj)) {
    result[key] = function useStorage(initialValue: any) {
      return useLocalStorage(obj[key], key, initialValue)
    }
  }

  return result
}
