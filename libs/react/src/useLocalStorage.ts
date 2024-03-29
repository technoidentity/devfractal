import { isFunction, parseJSON } from '@srtp/core'
import React from 'react'
import type { z } from 'zod'

import { useSafeState } from './local-state'
import { useEvent } from './useEvent'

export type LocalStorageResult<Spec extends z.ZodTypeAny> = readonly [
  z.infer<Spec>,
  (value: React.SetStateAction<z.infer<Spec>>) => void,
]

export function useLocalStorage<Spec extends z.ZodTypeAny>(
  spec: Spec,
  key: string,
  initialValue: z.infer<Spec>,
): LocalStorageResult<Spec> {
  const readValue = useEvent((): unknown => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? parseJSON(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  })

  const [storageValue, setStorageValue] = useSafeState(spec, readValue)

  const setValue = useEvent((value: React.SetStateAction<z.infer<Spec>>) => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
      return
    }

    try {
      const newValue = isFunction(value) ? value(storageValue) : value

      window.localStorage.setItem(key, JSON.stringify(newValue))
      setStorageValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  })

  const storageChange = useEvent((event: StorageEvent) => {
    if (event.key === key) {
      setStorageValue(readValue())
    }
  })

  React.useEffect(() => {
    window.addEventListener('storage', storageChange)

    return () => {
      window.removeEventListener('storage', storageChange)
    }
  }, [storageChange])

  return [storageValue, setValue] as const
}
