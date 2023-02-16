import { Handlers, state } from '@srtp/local-state'
import { castDraft } from 'immer'
import React, { useMemo } from 'react'
import {
  ClientTableState,
  FieldPredicates,
  FieldSearch,
  RowBase,
  RowPredicate,
  Sort,
} from './types'
import {
  searchRows,
  fieldPredicateRows,
  paginateRows,
  predicateRows,
  fieldSearchRows,
  sortRows,
} from './utils'

function useClientTableHandlers<Row extends RowBase>() {
  return React.useMemo(
    () =>
      ({
        handleSort(state, accessor: keyof Row) {
          const order =
            state.sort.order === 'asc' && state.sort.orderBy === accessor
              ? 'desc'
              : 'asc'
          state.page = 1
          state.sort = { order, orderBy: castDraft(accessor) }
        },

        handleSearch(state, search?: string | undefined) {
          state.search = search
        },

        handleFieldSearch(state, key: keyof Row, val?: string | undefined) {
          state.page = 1
          if (val) {
            ;(state.fieldSearch as any)[key] = val
          } else {
            delete (state.fieldSearch as any)[key]
          }
        },

        setPage(state, page: number) {
          state.page = page
        },
      } satisfies Handlers<ClientTableState<Row>>),
    [],
  )
}

function useState<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useState = React.useMemo(() => state(initialState, handlers), [])
  return useState()
}

export type UseClientTable<Row extends RowBase> = Readonly<{
  rows: readonly Row[]
  perPage?: number
  search?: string
  initialPage?: number
  initialSort?: Sort<Row>

  initialFieldSearch?: FieldSearch<Row>
  fieldPredicates?: FieldPredicates<Row>
  rowPredicate?: RowPredicate<Row>
}>

export function useClientTable<Row extends RowBase>(
  props: UseClientTable<Row>,
) {
  const {
    rows,
    perPage = 20,
    initialSort,
    initialPage,

    initialFieldSearch,
  } = props

  const initialState = {
    search: '',
    page: initialPage || 1,
    sort: initialSort || { order: 'asc', orderBy: 'id' },
    filters: initialFieldSearch,
  } as const
  const handlers = useClientTableHandlers<Row>()

  const [state, actions] = useState(initialState, handlers)

  const searchedRows = useMemo(
    () => (state.search ? searchRows(rows, state.search) : rows),
    [rows, state.search],
  )

  const fieldSearchedRows = useMemo(
    () =>
      state.filters
        ? fieldSearchRows(searchedRows, state.filters)
        : searchedRows,
    [state.filters, searchedRows],
  )

  const filteredRows = useMemo(
    () =>
      props.fieldPredicates
        ? fieldPredicateRows(fieldSearchedRows, props.fieldPredicates)
        : fieldSearchedRows,
    [props.fieldPredicates, fieldSearchedRows],
  )

  const rowPredicateRows = useMemo(
    () =>
      props.rowPredicate
        ? predicateRows(filteredRows, props.rowPredicate)
        : filteredRows,
    [filteredRows, props.rowPredicate],
  )

  const sortedRows = useMemo(
    () => sortRows(rowPredicateRows, state.sort),
    [rowPredicateRows, state.sort],
  )

  const currentRows = React.useMemo(
    () => paginateRows(sortedRows, state.page, perPage),
    [perPage, sortedRows, state.page],
  )

  const totalPages = React.useMemo(
    () => Math.ceil(fieldSearchedRows.length / perPage),
    [fieldSearchedRows.length, perPage],
  )

  const selects = {
    filterRows: fieldSearchRows,
    sortedRows,
    currentRows,
    totalPages,
  }

  return { props, state, actions, selects }
}
