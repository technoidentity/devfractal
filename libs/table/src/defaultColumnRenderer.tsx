import { toStr } from '@srtp/core'
import type { RowBase } from './types'
import React from 'react'

const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return formatter.format(date)
}

export function defaultColumnRenderer<Row extends RowBase>(
  key: keyof Row,
  row: Row,
): React.ReactNode {
  const col = row[key] as any
  const r = col instanceof Date ? formatDate(col) : col

  return <td>{toStr(r)}</td>
}
