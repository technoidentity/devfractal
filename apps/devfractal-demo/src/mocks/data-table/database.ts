import {
  any,
  chain,
  filter,
  isArray,
  isDefined,
  isUndefined,
  omit$,
  paged,
  pick$,
  pipe,
} from 'devfractal'

import { data, type Product } from '@/server-side'

import { orderBy, picked } from './utils'

export type ProductsResponse = {
  products: Array<any>
  currentPage: number
  totalPages: number
  totalItems: number
  columns: string[]
}

export function getDataFromTable(params: {
  show: 'all' | 'paged'
  column: string | string[]
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
  searchBy?: keyof Product | 'all'
  search?: string
}): ProductsResponse {
  if (
    params.show === 'all' &&
    isUndefined(params.page) &&
    isUndefined(params.limit)
  ) {
    const selected = isArray(params.column) ? params.column : [params.column]

    return {
      products: data.map(product =>
        pick$(product, [...selected] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: 0,
      totalItems: data.length,
      totalPages: 0,
    }
  }

  return getPaginatedProducts({ ...omit$(params, ['show']) })
}

function getPaginatedProducts(params: {
  column: string | string[]
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
  searchBy?: keyof Product | 'all'
  search?: string
}): ProductsResponse {
  const selected = isArray(params.column) ? params.column : [params.column]

  if (
    isDefined(params.page) &&
    isDefined(params.limit) &&
    isDefined(params.sortBy) &&
    isDefined(params.order) &&
    isDefined(params.searchBy) &&
    isDefined(params.search)
  ) {
    const searchKey = params.searchBy
    const searchStr = params.search

    return {
      products: chain(
        data,
        paged(params.page, params.limit),
        orderBy(params.sortBy as keyof Product, params.order),
        filter(product => hasSearchString(product, searchKey, searchStr)),
        picked([...selected] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / params.limit),
    }
  }

  if (
    isDefined(params.page) &&
    isDefined(params.limit) &&
    isDefined(params.sortBy) &&
    isDefined(params.order)
  ) {
    return {
      products: chain(
        data,
        paged(params.page, params.limit),
        orderBy(params.sortBy as keyof Product, params.order),
        picked([...selected] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / params.limit),
    }
  }

  if (isDefined(params.page) && isDefined(params.limit)) {
    return {
      products: chain(
        data,
        paged(params.page, params.limit),
        picked([...selected] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / params.limit),
    }
  }

  return {
    products: chain(
      data,
      paged(1, 10),
      picked([...selected] as (keyof Product)[]),
    ),
    columns: selected,
    currentPage: 1,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / 10),
  }
}

function hasSearchString<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K | 'all',
  text: string,
): boolean {
  if (key !== 'all') {
    return obj[key].toString().toLowerCase().includes(text.toLowerCase())
  }

  return pipe(
    Object.values(obj),
    any(value => value.toString().toLowerCase().includes(text.toLowerCase())),
  )
}
