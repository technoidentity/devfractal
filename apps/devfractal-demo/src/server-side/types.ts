import type React from 'react'

export type Row = Record<string, number | string | boolean | Date> & {
  id: number
}

export type DataRows = ReadonlyArray<Row>

// export type Row = {
//   [k: string]: string | number | boolean | Date
// } & { id: number }

type NumberFormat = {
  locales: string | string[]
  options: Intl.NumberFormatOptions
}

type StringFormat = {
  lowercase: boolean
  uppercase: boolean
}

// Also lucide react icons?
type BooleanFormat = {
  as: React.ReactSVGElement | string
}

type DateFormat = {
  locales: string | string[]
  options: Intl.DateTimeFormatOptions
}

// @TODO: WIP
export function formatData(
  cellData: string | number | boolean | Date,
  format: NumberFormat | StringFormat | BooleanFormat | DateFormat,
) {
  if (typeof cellData === 'number' && 'locales' && 'options' in format) {
    return new Intl.NumberFormat(format.locales, format.options)
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
    ).format(cellData)
  }

  return cellData
}
