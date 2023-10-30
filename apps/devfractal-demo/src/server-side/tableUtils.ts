import { chain, map } from 'devfractal'

import type { Columns, Row } from './types'

// @TODO: Percentages?
type NumberFormat = {
  locales: string | string[]
  options: Intl.NumberFormatOptions
}

type StringFormat = {
  lowercase: boolean
  uppercase: boolean
}

type BooleanFormat = {
  as: React.ReactElement | string
}

type DateFormat = {
  locales: string | string[]
  options: Intl.DateTimeFormatOptions
}

// @TODO: WIP
export function formatData(
  cellData: string | number | boolean | Date,
  format?: NumberFormat | StringFormat | BooleanFormat | DateFormat,
) {
  if (!format) {
    return cellData instanceof Date
      ? cellData.toLocaleDateString()
      : typeof cellData === 'boolean'
      ? cellData.toString()
      : cellData
  }

  if (typeof cellData === 'number' && 'locales' && 'options' in format) {
    return new Intl.NumberFormat(format.locales, format.options).format(
      cellData,
    )
  }

  if (typeof cellData === 'string' && 'lowercase' && 'uppercase' in format) {
    return format.lowercase
      ? cellData.toLowerCase()
      : format.uppercase
      ? cellData.toUpperCase()
      : cellData
  }

  if (typeof cellData === 'boolean' && 'as' in format) {
    return format.as === 'string' ? cellData.toString() : format.as
  }

  if (cellData instanceof Date && 'locales' && 'options' in format) {
    return new Intl.DateTimeFormat(
      format.locales,
      format.options as Intl.DateTimeFormatOptions,
    )
      .format(cellData)
      .toString()
  }

  return cellData.toString()
}

export const getTableHeaders = (columns: Columns) => {
  return chain(
    columns,
    map(column => column.title),
  )
}

// @TODO: Columns may not be needed as a param
export const getCellData = <T extends Row>(
  columns: Columns,
  cell: readonly [keyof T, T[keyof T]],
) => {
  const column = columns.find(column => column.title === cell[0]) // @TODO: Costly operation -> May need faster lookups

  if (!column) {
    return ''
  }

  return column.render
    ? column.render(formatData(cell[1]))
    : formatData(cell[1])
}
