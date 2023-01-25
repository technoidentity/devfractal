import { Center, Checkbox, Flex, Input } from '@mantine/core'

interface SearchBarProps {
  onSearchText(text: string): void
  onChecked(checked: boolean): void
}

export const SearchBar = ({ onSearchText, onChecked }: SearchBarProps) => {
  return (
    <Center mb="20px">
      <Flex direction="column">
        <Input
          id="search"
          type="text"
          onChange={evt => onSearchText(evt.target.value)}
          placeholder="Search..."
        />
        <Checkbox
          mt="sm"
          color="red"
          onChange={evt => onChecked(evt.target.checked)}
          label="Only show products in stock"
        />
      </Flex>
    </Center>
  )
}
