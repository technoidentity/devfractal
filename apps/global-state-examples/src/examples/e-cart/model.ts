export type Product = {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

export type Products = Map<Product['id'], Product>

export type CartItem = {
  readonly product: Product
  readonly count: number
}

export type Cart = Map<CartItem['product']['id'], CartItem>

export const filterProducts = (products: Products, category: string) =>
  category === 'all'
    ? products.values()
    : Array.from(products.values()).filter(item => item.category === category)
