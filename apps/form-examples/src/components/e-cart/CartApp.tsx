import React from 'react'
import { removeAt, replaceAt2 } from './arrayUtils'
import { CategoryMenu } from './CategoryMenu'
import { fakeProductList } from './fakeProducts'
import type { CartItem, Product } from './Product'
import { CartList, ProductList } from './Product'

const fakeProducts = fakeProductList(10)

export const CartApp = () => {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const handleAddProduct = (product: Product) => {
    const cartIndex = cart.findIndex(item => item.product === product)
    if (cartIndex === -1) {
      setCart([...cart, { product, count: 1 }])
    } else {
      const oldItem = cart[cartIndex]
      const newItem = { ...oldItem, count: oldItem.count + 1 }
      const newCart = replaceAt2(cart, cartIndex, newItem)
      setCart(newCart)
    }
  }

  const handleRemoveItem = (item: CartItem) => {
    setCart(cart.filter(it => it !== item))
  }

  const handleIncrement = (cartItem: CartItem) => {
    const index = cart.findIndex(item => item === cartItem)
    const item = cart[index]
    const newItem = { ...item, count: item.count + 1 }
    const newCart = replaceAt2(cart, index, newItem)
    setCart(newCart)
  }

  const handleDecrement = (cartItem: CartItem) => {
    const index = cart.findIndex(item => item === cartItem)
    const item = cart[index]
    if (item.count > 1) {
      const newItem = { ...item, count: item.count - 1 }
      const newCart = replaceAt2(cart, index, newItem)
      setCart(newCart)
    } else {
      const newCart = removeAt(cart, index)
      setCart(newCart)
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const filteredCategoryProducts =
    selectedCategory === 'all'
      ? fakeProducts
      : fakeProducts.filter(item => item.category === selectedCategory)

  return (
    <>
      <CartList
        cartList={cart}
        onRemoveItem={handleRemoveItem}
        onInc={handleIncrement}
        onDec={handleDecrement}
      />

      <CategoryMenu onCategorySelect={handleCategorySelect} />

      <ProductList
        productList={filteredCategoryProducts}
        onAddProduct={handleAddProduct}
        onProductView={product => console.log(product)}
      />
    </>
  )
}
