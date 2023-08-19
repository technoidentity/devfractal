/* eslint-disable @typescript-eslint/no-floating-promises */
import { pipe, uniqueBy } from '@srtp/fn'
import { state } from '@srtp/local-state'
import { castDraft } from 'immer'
import type { RowBase } from './types'
export type CrudTableSearchFilters<Row extends RowBase> = Record<
  keyof Row,
  string | number | Date | boolean
>

export type CrudTableState<Row extends RowBase> = Readonly<{
  sort: keyof Row
  order: 'asc' | 'desc'
  selectedRows: readonly Row[]
  selectedColumns: ReadonlyArray<keyof Row>
  page: number
  search: CrudTableSearchFilters<Row>
  perPage: number
}>

export function useTable<Row extends RowBase>(
  initialState: CrudTableState<Row>,
) {
  return state(initialState, {
    changeSortOrder(state, sort: keyof Row) {
      if (sort === state.sort) {
        state.order = state.order === 'asc' ? 'desc' : 'asc'
      } else {
        state.sort = castDraft(sort)
      }
    },

    selectColumns(state, columns: ReadonlyArray<keyof Row>) {
      state.selectedColumns = castDraft(columns)
    },

    changePage(state, page: number) {
      state.page = page
    },

    setPerPage(state, perPage: number) {
      state.perPage = perPage
    },

    updateFilters(state, search: Partial<CrudTableSearchFilters<Row>>) {
      Object.assign(state.search, state.search, search)
    },

    toggleRow(state, { row, idKey }: Readonly<{ row: Row; idKey: keyof Row }>) {
      const idx = state.selectedRows.findIndex(
        r => (r as Row)[idKey] === row[idKey],
      )

      if (idx === -1) {
        state.selectedRows.push(castDraft(row))
      } else {
        state.selectedRows.splice(idx, 1)
      }

      state.selectedRows = pipe(
        state.selectedRows,
        uniqueBy(r => (r as Row)[idKey]),
      )
    },
  })
}
