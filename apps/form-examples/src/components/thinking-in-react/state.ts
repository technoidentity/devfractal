import { computed } from '@srtp/global-state'
import { PRODUCTS } from '../../utils/data'
import { categorizedProducts } from '../../utils/dataTransform'
import { atom } from 'jotai'

export const textAtom = atom('')
export const stockedAtom = atom(false)

export const searchProductsAtom = computed(get =>
  get(textAtom).trim() === ''
    ? PRODUCTS
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(get(textAtom).toLowerCase()),
      ),
)

export const inStockProductsAtom = computed(get =>
  get(stockedAtom)
    ? get(searchProductsAtom).filter(p => p.stocked)
    : get(searchProductsAtom),
)

export const categoryProductsAtom = computed(get =>
  Object.entries(categorizedProducts(get(inStockProductsAtom))),
)
