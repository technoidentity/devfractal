import { jstr } from '@core/casts'
import React from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, jstr(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
