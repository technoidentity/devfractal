/* eslint-disable no-underscore-dangle */

import type { FieldSpec } from '@srtp/core'
import {
  boolean,
  date,
  dateRange,
  defaultValue,
  int,
  number,
  string,
} from '@srtp/core'
import React from 'react'
import { z } from 'zod'

import { safeUpdateState } from './safeState'

export function primitive<Spec extends FieldSpec>(spec: Spec) {
  const useState = safeUpdateState(z.object({ value: spec }))

  type Value = z.infer<Spec>

  return function usePrimitiveState(initialValue?: Value) {
    const [state, { setValue }] = useState({
      value: initialValue ?? defaultValue(spec),
    })

    const update = React.useCallback(
      (vfn: (_: Value) => Value) => {
        setValue(vfn)
      },
      [setValue],
    )

    const set = React.useCallback(
      (v: Value) => {
        setValue(() => v)
      },
      [setValue],
    )

    return [state.value as Value, update, set] as const
  }
}

export const useBoolean = primitive(boolean())
export const useNumber = primitive(number())
export const useInt = primitive(int())
export const useDate = primitive(date())
export const useString = primitive(string())
export const useDateRange = primitive(dateRange())

export function useToggle(value: boolean) {
  const [v, update] = useBoolean(value)

  const toggle = React.useCallback(() => update(value => !value), [update])
  const set = React.useCallback(() => update(_ => true), [update])
  const reset = React.useCallback(() => update(_ => false), [update])

  return [v, { set, reset, toggle }] as const
}

export function useEnumValue<
  Spec extends z.ZodEnum<any> | z.ZodNativeEnum<any>,
>(spec: Spec, value: z.infer<Spec>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useEnum = React.useMemo(() => primitive(spec), [])

  return useEnum(value)
}
