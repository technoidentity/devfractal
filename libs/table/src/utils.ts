import { debugCast, isBool, isNil, isNum, isStr } from '@srtp/core'
import { isEmpty } from 'lodash'
import { z } from 'zod'
import { FieldPredicates, Filters, RowBase, RowPredicate, Sort } from './types'

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

export function searchRows<Row extends object>(
  rows: readonly Row[],
  filters: Filters<Row>,
) {
  if (isEmpty(filters)) {
    return rows
  }

  return rows.filter(row => {
    return Object.keys(filters).every(accessor => {
      const searchValue = debugCast(z.string(), (filters as any)[accessor])
      if (isNil(searchValue) || searchValue.trim() === '') {
        return true
      }

      const value = debugCast(Primitive, (row as any)[accessor])

      return seq(searchValue, value)
    })
  })
}

export function predicateRows<Row extends RowBase>(
  rows: readonly Row[],
  predicate: RowPredicate<Row>,
) {
  return rows.filter(predicate)
}

export function fieldPredicateRows<Row extends RowBase>(
  rows: readonly Row[],
  predicates: FieldPredicates<Row>,
) {
  return rows.filter(row =>
    Object.keys(predicates).every(key => {
      const k = key as keyof Row
      const fn = predicates[k]
      return fn?.(row[k]) || true
    }),
  )
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

export function sortRows<Row extends object>(
  rows: readonly Row[],
  sort: Sort<Row>,
) {
  return [...rows].sort((a, b) => {
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

export function paginateRows<Row extends object>(
  sortedRows: readonly Row[],
  activePage: number,
  rowsPerPage: number,
): Row[] {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage,
  )
}
