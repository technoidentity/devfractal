import { isBoolean, isEmpty, isNumber, isString, isNil } from 'lodash'
import { Row } from './data'

export function filterRows(rows: Row[], filters: Record<string, string>) {
  if (isEmpty(filters)) {
    return rows
  }

  return rows.filter(row => {
    return Object.keys(filters).every(accessor => {
      const value = (row as any)[accessor]
      const searchValue = filters[accessor]

      if (searchValue.trim() === '') {
        return true
      }
      if (isString(value)) {
        return value.toLowerCase().includes(searchValue.toLowerCase())
      }

      if (isBoolean(value)) {
        return (
          (searchValue === 'true' && value) ||
          (searchValue === 'false' && !value)
        )
      }

      if (isNumber(value)) {
        return value === Number(searchValue)
      }

      return false
    })
  })
}

export type Sort = {
  order: 'asc' | 'desc'
  orderBy: keyof Row
}

export function isDateString(value: unknown): value is string {
  if (!isString(value)) {
    return false
  }

  return value.match(/^\d{2}-\d{2}-\d{4}$/) !== null
}

export function convertDateString(value: string) {
  return value.slice(6, 4) + value.slice(3, 2) + value.slice(0, 2)
}

export function convertType(value: unknown): string {
  if (isNumber(value)) {
    return value.toString()
  }

  if (isDateString(value)) {
    return convertDateString(value)
  }

  if (isBoolean(value)) {
    return value ? '1' : '-1'
  }

  throw new Error(`{value} not a number or date or boolean`)
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
        numeric: isNumber(b[orderBy]),
      })
    } else {
      return bLocale.localeCompare(aLocale, 'en', {
        numeric: isNumber(a[orderBy]),
      })
    }
  })
}