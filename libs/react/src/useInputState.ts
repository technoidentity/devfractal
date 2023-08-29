import { isFunction } from '@srtp/core'
import React from 'react'
import warning from 'tiny-warning'

import { useEvent } from './useEvent'

type OnChangeArgs<T> = null | undefined | T | React.ChangeEvent<any>
type OnChange<T> = (value: OnChangeArgs<T>) => void

export function useInputState<T>(initialState: T): readonly [T, OnChange<T>] {
  const [value, setValue] = React.useState(initialState)

  const onChange = useEvent((val: OnChangeArgs<T> | ((current: T) => T)) => {
    if (!val) {
      setValue(val as T)
    } else if (isFunction(val)) {
      setValue(val)
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      const { currentTarget } = val

      warning(
        currentTarget instanceof HTMLInputElement ||
          currentTarget instanceof HTMLTextAreaElement ||
          currentTarget instanceof HTMLSelectElement,
        "You mostly can't use useInputState with this element.",
      )

      if (currentTarget.type === 'checkbox') {
        setValue(currentTarget.checked)
      } else {
        setValue(currentTarget.value)
      }
    } else {
      setValue(val)
    }
  })

  return [value, onChange] as const
}
