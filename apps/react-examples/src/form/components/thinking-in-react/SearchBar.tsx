import { Center, Checkbox, Flex, Input } from '@mantine/core'
import { useAction } from '@srtp/react'

import { stockedAtom, textAtom } from './state'

export const SearchBar = () => {
  const setIsStocked = useAction(stockedAtom)
  const setSearchText = useAction(textAtom)

  return (
    <Center mb="20px">
      <Flex direction="column">
        <Input
          id="search"
          type="text"
          onChange={evt => setSearchText(evt.target.value)}
          placeholder="Search..."
        />
        <Checkbox
          mt="sm"
          color="red"
          onChange={evt => setIsStocked(evt.target.checked)}
          label="Only show products in stock"
        />
      </Flex>
    </Center>
  )
}
