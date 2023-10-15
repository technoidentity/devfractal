// import { pick$ } from 'devfractal'

// import { iorderBy } from '@/mocks/data-table/utils'
// import { data, type Product, type Products } from '@/server-side/products'

// export type ProductsResponse = {
//   products: Array<any>
//   currentPage: number
//   totalPages: number
//   totalItems: number
//   columns: string[]
// }

// const products: Products = []

// // Load data
// const intializeProducts = (): void => {
//   products.push(...data)
// }

// intializeProducts()

// // Operations
// export const getSelectedColumns = (
//   products: Products,
//   columns: string[],
// ): ProductsResponse => {
//   return {
//     products: data.map(product =>
//       pick$(product, ['id', ...(columns as (keyof Product)[])]),
//     ),
//     columns,
//     currentPage: 0,
//     totalItems: products.length,
//     totalPages: 0,
//   }
// }

// export const getSlicedProducts = (
//   page: number,
//   limit: number,
//   columns: string[],
// ): ProductsResponse => {
//   // @TODO: use paged from array methods
//   const endIndex = page * limit
//   const startIndex = endIndex - limit

//   const totalPages = Math.ceil(products.length / limit)

//   return {
//     products: products.slice(startIndex, endIndex),
//     currentPage: page,
//     totalPages,
//     totalItems: products.length,
//     columns,
//   }
// }

// export const getSortedProducts = (
//   show: 'all' | 'paged',
//   page: number,
//   limit: number,
//   columns: string[],
//   sortKey: keyof Product,
//   order: 'asc' | 'desc',
// ): ProductsResponse => {
//   const slicedResult =
//     show === 'all'
//       ? getSelectedColumns(products, columns)
//       : getSlicedProducts(page, limit, columns)

//   return {
//     ...slicedResult,
//     products: iorderBy(slicedResult.products, sortKey, order),
//   }
// }

// // @TODO: Function overloading?

// export const getSearchedProducts = (
//   show: 'all' | 'paged',
//   page: number,
//   limit: number,
//   columns: string[],
//   searchBy: keyof Product | 'all',
//   search: string,
//   sortKey?: keyof Product,
//   order?: 'asc' | 'desc',
// ): ProductsResponse => {
//   const result =
//     sortKey && order
//       ? getSortedProducts(show, page, limit, columns, sortKey, order)
//       : getSlicedProducts(page, limit, columns)

//   const searchResult =
//     searchBy !== 'all'
//       ? result.products.filter(product =>
//           product[searchBy]
//             .toString()
//             .toLowerCase()
//             .includes(search.toLowerCase()),
//         )
//       : result.products.filter(product =>
//           Object.values(product).some(value =>
//             value.toString().toLowerCase().includes(search.toLowerCase()),
//           ),
//         )

//   const totalPages = Math.ceil(products.length / limit)

//   return {
//     ...result,
//     products: searchResult,
//     totalPages,
//   }
// }
