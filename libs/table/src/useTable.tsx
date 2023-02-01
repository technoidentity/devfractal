import { state } from '@srtp/local-state'
import { castDraft } from 'immer'
import { uniqBy } from 'lodash-es'

export type CrudTableState<T extends object> = Readonly<{
  sort: keyof T
  order: 'asc' | 'desc'

  selectedRows: readonly T[]
  selectedColumns: ReadonlyArray<keyof T>

  page: number
  // readonly perPage: number
}>

export const useCrudTable = <T extends object>(
  initialState: CrudTableState<T>,
) =>
  state(initialState, {
    changeSortOrder(state, sort: keyof T) {
      if (sort === state.sort) {
        state.order = state.order === 'asc' ? 'desc' : 'asc'
      } else {
        state.sort = castDraft(sort)
      }
    },
    selectColumns(state, columns: ReadonlyArray<keyof T>) {
      state.selectedColumns = castDraft(columns)
    },
    changePage(state, page: number) {
      state.page = page
    },
    toggleRow(state, { row, idKey }: Readonly<{ row: T; idKey: keyof T }>) {
      const idx = state.selectedRows.findIndex(
        r => (r as T)[idKey] === row[idKey],
      )

      if (idx === -1) {
        state.selectedRows.push(castDraft(row))
      } else {
        state.selectedRows.splice(idx, 1)
      }
      state.selectedRows = uniqBy(state.selectedRows, r => (r as T)[idKey])
    },
  })
