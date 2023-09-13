import { Center, Flex, Title } from '@mantine/core'

import { ProductTable } from './ProductTable'
import { SearchBar } from './SearchBar'

export const FilterableProductTable = () => {
  return (
    <Flex direction="column">
      <Center>
        <Title mb="md">Thinking in React</Title>
      </Center>
      <SearchBar />
      <ProductTable />
    </Flex>
  )
}
