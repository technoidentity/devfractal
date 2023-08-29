import { toStr } from '@srtp/core'
import React from 'react'

import type { RowBase } from './types'

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
