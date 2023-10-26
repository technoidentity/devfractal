import {
  any,
  chain,
  filter,
  isArray,
  isDefined,
  omit$,
  paged,
  pipe,
} from 'devfractal'

import { data, type Product, type Products } from '@/server-side'

import { orderBy, picked } from './utils'

export type ProductsResponse = {
  products: Array<any>
  currentPage: number
  totalPages: number
  totalItems: number
  columns: string[]
}

const products: Products = []

export const initializeProducts = (): void => {
  products.push(...data)
}

initializeProducts()

export function deleteRowFromTable(id: number) {
  const targetIndex = products.findIndex(product => product.id === id)

  if (targetIndex === -1) {
    return
  }

  return products.splice(targetIndex, 1)
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
  const selected = isArray(params.column) ? params.column : [params.column]

  if (
    params.show === 'all' &&
    isDefined(params.sortBy) &&
    isDefined(params.order) &&
    isDefined(params.searchBy) &&
    isDefined(params.search)
  ) {
    const searchKey = params.searchBy
    const searchStr = params.search

    return {
      products: chain(
        products,
        orderBy(params.sortBy as keyof Product, params.order),
        filter(product => hasSearchString(product, searchKey, searchStr)),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: 0,
      totalItems: products.length,
      totalPages: 0,
    }
  }

  if (
    params.show === 'all' &&
    isDefined(params.sortBy) &&
    isDefined(params.order)
  ) {
    return {
      products: chain(
        products,
        orderBy(params.sortBy as keyof Product, params.order),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: 0,
      totalItems: products.length,
      totalPages: 0,
    }
  }

  if (
    params.show === 'all' &&
    isDefined(params.searchBy) &&
    isDefined(params.search)
  ) {
    const searchKey = params.searchBy
    const searchStr = params.search

    return {
      products: chain(
        products,
        filter(product => hasSearchString(product, searchKey, searchStr)),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: 0,
      totalItems: products.length,
      totalPages: 0,
    }
  }

  if (params.show === 'all') {
    return {
      products: chain(
        products,
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: 0,
      totalItems: products.length,
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
        products,
        paged(params.page, params.limit),
        orderBy(params.sortBy as keyof Product, params.order),
        filter(product => hasSearchString(product, searchKey, searchStr)),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / params.limit),
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
        products,
        paged(params.page, params.limit),
        orderBy(params.sortBy as keyof Product, params.order),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / params.limit),
    }
  }

  if (
    isDefined(params.page) &&
    isDefined(params.limit) &&
    isDefined(params.searchBy) &&
    isDefined(params.search)
  ) {
    const searchKey = params.searchBy
    const searchStr = params.search

    return {
      products: chain(
        products,
        paged(params.page, params.limit),
        filter(product => hasSearchString(product, searchKey, searchStr)),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / params.limit),
    }
  }

  if (isDefined(params.page) && isDefined(params.limit)) {
    return {
      products: chain(
        products,
        paged(params.page, params.limit),
        picked([...selected, 'id'] as (keyof Product)[]),
      ),
      columns: selected,
      currentPage: params.page,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / params.limit),
    }
  }

  return {
    products: chain(
      products,
      paged(1, 10),
      picked([...selected, 'id'] as (keyof Product)[]),
    ),
    columns: selected,
    currentPage: 1,
    totalItems: products.length,
    totalPages: Math.ceil(products.length / 10),
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
