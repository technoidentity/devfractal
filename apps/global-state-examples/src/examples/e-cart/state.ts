import { action, computed, immerAction, signal } from '@srtp/global-state'

import { replaceAt2 } from './arrayUtils'
import { CartItem } from './CartList'
import { fakeProductList } from './fakeProducts'
import { Product } from './ProductList'

type Category = string

export const fakeProducts = fakeProductList(10)

export const cartAtom = signal<CartItem[]>([])
export const selectedCategoryAtom = signal<Category>('all')

export const addProductToCart = action((get, set, product: Product) => {
  const cart = get(cartAtom)

  const cartIndex = cart.findIndex(item => item.product === product)
  if (cartIndex === -1) {
    set(cartAtom, [...cart, { product, count: 1 }])
  } else {
    const oldItem = cart[cartIndex]
    const newItem = { ...oldItem, count: oldItem.count + 1 }
    const newCart = replaceAt2(cart, cartIndex, newItem)
    set(cartAtom, newCart)
  }
})

export const removeProductFromCart = immerAction((_, set, cartItem: CartItem) =>
  set(cartAtom, draft => {
    const index = draft.findIndex(item => item === cartItem)
    if (index !== -1) {
      draft.splice(index, index + 1)
    }
  }),
)

export const incrementProductQuantityInCart = action(
  (get, set, cartItem: CartItem) => {
    const cart = get(cartAtom)
    const index = cart.findIndex(item => item === cartItem)
    const item = cart[index]
    const newItem = { ...item, count: item.count + 1 }
    const newCart = replaceAt2(cart, index, newItem)
    set(cartAtom, newCart)
  },
)

export const decreaseProductQuantityInCart = action(
  (get, set, cartItem: CartItem) => {
    const cart = get(cartAtom)
    const index = cart.findIndex(item => item === cartItem)
    const item = cart[index]
    const newItem = { ...item, count: item.count - 1 }
    const newCart = replaceAt2(cart, index, newItem)
    set(cartAtom, newCart)
  },
)

export const selectCategory = action((_, set, category: Category) => {
  set(selectedCategoryAtom, category)
})

export const filteredCategoryProductsAtom = computed(get =>
  get(selectedCategoryAtom) === 'all'
    ? fakeProducts
    : fakeProducts.filter(item => item.category === get(selectedCategoryAtom)),
)
