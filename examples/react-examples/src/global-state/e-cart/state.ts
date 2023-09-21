import { action, computed } from '@srtp/react'
import { original } from 'immer'
import { atom } from 'jotai'

import type { CartItem } from './CartList'
import { fakeProductList } from './fakeProducts'
import type { Product } from './ProductList'
type Category = string

export const fakeProducts = fakeProductList(10)

export const cartAtom = atom<CartItem[]>([])
export const selectedCategoryAtom = atom<Category>('all')

export const filteredProductsAtom = computed(get =>
  get(selectedCategoryAtom) === 'all'
    ? fakeProducts
    : fakeProducts.filter(item => item.category === get(selectedCategoryAtom)),
)

export const addToCart = action(cartAtom, ({ state }, product: Product) => {
  const cartIndex = state.findIndex(item => original(item)?.product === product)
  if (cartIndex === -1) {
    state.push({ product, count: 1 })
  } else {
    state[cartIndex].count += 1
  }
})

export const removeFromCart = action(({ set }, cartItem: CartItem) =>
  set(cartAtom, draft => {
    const index = draft.findIndex(item => original(item) === cartItem)

    if (index !== -1) {
      draft.splice(index, 1)
    }
  }),
)

export const incrementQuantity = action(
  cartAtom,
  ({ state }, cartItem: CartItem) => {
    const index = state.findIndex(item => original(item) === cartItem)
    state[index].count += 1
  },
)

export const decrementQuantity = action(
  cartAtom,
  ({ state }, cartItem: CartItem) => {
    const index = state.findIndex(item => original(item) === cartItem)
    state[index].count -= 1
  },
)

export const selectCategory = action(({ set }, category: Category) => {
  set(selectedCategoryAtom, category)
})

export const totalCartPrice = computed(get =>
  get(cartAtom).reduce((acc, v) => acc + v.product.price * v.count, 0),
)

export const totalCartItems = computed(get => {
  return get(cartAtom).reduce((acc, v) => acc + v.count, 0)
})
