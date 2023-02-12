import { Handlers, state } from '@srtp/local-state'
import { castDraft } from 'immer'
import React, { useMemo } from 'react'
import {
  ClientTableState,
  FieldPredicates,
  Filters,
  RowBase,
  RowPredicate,
  Sort,
} from './types'
import {
  fieldPredicateRows,
  paginateRows,
  predicateRows,
  searchRows,
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
          state.activePage = 1
          state.sort = { order, orderBy: castDraft(accessor) }
        },

        handleSearch(state, key: keyof Row, val?: string | undefined) {
          state.activePage = 1
          if (val) {
            ;(state.filters as any)[key] = val
          } else {
            delete (state.filters as any)[key]
          }
        },

        setActivePage(state, activePage: number) {
          state.activePage = activePage
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
  perPage: number
  initialFilters?: Filters<Row>
  fieldPredicates?: FieldPredicates<Row>
  rowPredicate?: RowPredicate<Row>
  initialPage?: number
  initialSort?: Sort<Row>
  rows: readonly Row[]
}>

export function useClientTable<Row extends RowBase>(
  props: UseClientTable<Row>,
) {
  const { initialFilters, initialSort, initialPage, rows, perPage } = props

  const initialState = {
    activePage: initialPage || 1,
    filters: initialFilters,
    sort: initialSort || { order: 'asc', orderBy: 'id' },
  } as const
  const handlers = useClientTableHandlers<Row>()

  const [state, actions] = useState(initialState, handlers)

  const searchedRows = useMemo(
    () => (state.filters ? searchRows(rows, state.filters) : rows),
    [state.filters, rows],
  )

  const filteredRows = useMemo(
    () =>
      props.fieldPredicates
        ? fieldPredicateRows(searchedRows, props.fieldPredicates)
        : searchedRows,
    [props.fieldPredicates, searchedRows],
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
    () => paginateRows(sortedRows, state.activePage, perPage),
    [perPage, sortedRows, state.activePage],
  )

  const totalPages = React.useMemo(
    () => Math.ceil(searchedRows.length / perPage),
    [searchedRows.length, perPage],
  )

  const selects = {
    filterRows: searchRows,
    sortedRows,
    currentRows,
    totalPages,
  }

  return { props, state, actions, selects }
}
