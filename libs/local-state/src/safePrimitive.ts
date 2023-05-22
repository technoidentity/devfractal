/* eslint-disable no-underscore-dangle */

import { is } from '@srtp/spec'
import type { FieldSpec } from '@srtp/validator'
import {
  boolean,
  date,
  dateRange,
  defaultValue,
  int,
  number,
  string,
} from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { safeUpdateState } from './safeState'

export function safePrimitive<Spec extends FieldSpec>(spec: Spec) {
  const useState = safeUpdateState(z.object({ value: spec }))

  type Value = z.infer<Spec>

  const isFn = (v: unknown): v is (v: Value) => Value => {
    return typeof v === 'function'
  }

  return function usePrimitiveState(initialValue?: Value) {
    const [{ value }, { setValue }] = useState({
      value: initialValue || defaultValue(spec),
    })

    const update = React.useCallback(
      (vfn: Value | ((_: Value) => Value)) => {
        setValue(state =>
          is(spec, state.value)
            ? spec.parse(isFn(vfn) ? vfn(state.value) : vfn)
            : state,
        )
      },
      [setValue],
    )

    return [value, update] as const
  }
}

export const useBoolean = safePrimitive(boolean())
export const useNumber = safePrimitive(number())
export const useInt = safePrimitive(int())
export const useDate = safePrimitive(date())
export const useString = safePrimitive(string())
export const useDateRange = safePrimitive(dateRange())

export function useToggle(value: boolean) {
  const [v, update] = useBoolean(value)

  const toggle = React.useCallback(() => update(value => !value), [update])
  const set = React.useCallback(() => update(_ => true), [update])
  const reset = React.useCallback(() => update(_ => false), [update])

  return [v, { set, reset, toggle }] as const
}
