import React from 'react'
import { useEvent } from '@srtp/react'

export type ForProps<T> = Readonly<{
  list: readonly T[]
  render: (item: T) => JSX.Element
}>

export const For = <T extends { id: any }>({ list, render }: ForProps<T>) => {
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
