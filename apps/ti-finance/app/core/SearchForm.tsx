import { isEmpty } from '@srtp/core'
import type { InputsType } from '@srtp/remix-react'
import { createInputsGroup } from '@srtp/remix-react'
import React from 'react'
import type { z } from 'zod'
import { useSearch } from './hooks'

export type SearchValues<Spec extends z.AnyZodObject> = z.infer<Spec>

export type SearchInputsProps<Spec extends z.AnyZodObject> = Readonly<{
  Inputs: InputsType<Spec>
}>

export type SearchProps<Spec extends z.AnyZodObject> = Readonly<{
  spec: Spec
  SearchFields: (args: SearchInputsProps<Spec>) => JSX.Element
}>

export function SearchForm<Spec extends z.AnyZodObject>({
  spec,
  SearchFields,
}: SearchProps<Spec>) {
  const { Inputs, InputsGroup } = React.useMemo(
    () => createInputsGroup(spec),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const [, set] = useSearch(spec)

  const handleSearchChange = React.useCallback(
    (values: SearchValues<Spec>) => {
      if (!isEmpty(values)) {
        set(values)
      }
    },
    [set],
  )

  return (
    <InputsGroup onChange={handleSearchChange}>
      <SearchFields Inputs={Inputs} />
    </InputsGroup>
  )
}
