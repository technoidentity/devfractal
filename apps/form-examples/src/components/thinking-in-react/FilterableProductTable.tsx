import { Center, Flex, Title } from '@mantine/core'
import React from 'react'
import { PRODUCTS } from '../../utils/data'
import { ProductTable } from './ProductTable'
import { SearchBar } from './SearchBar'

export const FilterableProductTable = () => {
  const [text, setText] = React.useState('')
  const [isStocked, setIsStocked] = React.useState(false)

  const searchProducts =
    text.trim() === ''
      ? PRODUCTS
      : PRODUCTS.filter(p => p.name.toLowerCase().includes(text.toLowerCase()))

  const inStockProducts = isStocked
    ? searchProducts.filter(p => p.stocked)
    : searchProducts

  return (
    <Flex direction="column">
      <Center>
        <Title mb="md">Thinking in React</Title>
      </Center>
      <SearchBar onChecked={setIsStocked} onSearchText={setText} />
      <ProductTable products={inStockProducts} />
    </Flex>
  )
}
