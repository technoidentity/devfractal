import React from 'react'

import { useEvent } from './useEvent'

type ID = { id: string | number }

export type ForProps<T extends ID> = Readonly<{
  list: readonly T[]
  render: (item: T) => JSX.Element
}>

export const For = <T extends ID>({ list, render }: ForProps<T>) => {
  const each = useEvent(render)

  return React.useMemo(
    () => (
      <>
        {list.map(item => (
          <React.Fragment key={item.id}>{each(item)}</React.Fragment>
        ))}
      </>
    ),
    [each, list],
  )
}
