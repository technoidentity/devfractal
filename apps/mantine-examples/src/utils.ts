import { debugCast, isBool, isNil, isNum, isStr } from '@srtp/core'
import { isEmpty } from 'lodash'
import { z } from 'zod'
import { Row } from './data'

const Primitive = z.union([z.number(), z.boolean(), z.string()]) // z.date()])
type Primitive = z.infer<typeof Primitive>

const seq = (search: string, value: Primitive): boolean => {
  if (isStr(value)) {
    return value.toLowerCase().includes(search.toLowerCase())
  }

  if (isBool(value)) {
    return (search === 'true' && value) || (search === 'false' && !value)
  }

  if (isNum(value)) {
    return value === Number(search)
  }

  return false
}

export function filterRows(rows: Row[], filters: Record<string, string>) {
  if (isEmpty(filters)) {
    return rows
  }

  return rows.filter(row => {
    return Object.keys(filters).every(accessor => {
      const searchValue = debugCast(z.string(), filters[accessor])
      if (isNil(searchValue) || searchValue.trim() === '') {
        return true
      }

      const value = debugCast(Primitive, (row as any)[accessor])

      return seq(searchValue, value)
    })
  })
}

export type Sort = {
  order: 'asc' | 'desc'
  orderBy: keyof Row
}

export function isDateString(value: unknown): value is string {
  if (!isStr(value)) {
    return false
  }

  return value.match(/^\d{2}-\d{2}-\d{4}$/) !== null
}

export function convertDateString(value: string) {
  return value.slice(6, 4) + value.slice(3, 2) + value.slice(0, 2)
}

export function convertType(value: unknown): string {
  if (isDateString(value)) {
    return convertDateString(value)
  }
  if (isNum(value)) {
    return value.toString()
  }

  if (isBool(value)) {
    return value ? '1' : '-1'
  }

  if (isStr(value)) {
    return value
  }

  if (isStr(value)) {
    return value
  }

  throw new Error(`{value} not a string, number or date or boolean`)
}

export function sortRows(rows: Row[], sort: Sort) {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort
    if (isNil(a[orderBy])) {
      return 1
    }
    if (isNil(b[orderBy])) {
      return -1
    }

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', {
        numeric: isNum(b[orderBy]),
      })
    }
    return bLocale.localeCompare(aLocale, 'en', {
      numeric: isNum(a[orderBy]),
    })
  })
}
