import type { Products } from './products'

export const fetchProducts = async () => {
  const data = await (await fetch('/api/data/products')).json()
  return data as Products
}
