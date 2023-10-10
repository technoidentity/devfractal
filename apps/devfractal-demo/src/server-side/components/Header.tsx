import {
  Box,
  HStack,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'devfractal'
import React from 'react'
import { headers } from '../products'

export function Header({
  onSearch,
}: {
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  const [search, setSearch] = React.useState('')

  return (
    <HStack className="justify-between items-center w-full">
      {/* @TODO: shad-cn does not seem to support multiple selections */}
      <Box className="w-1/4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select columns to display" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Columns</SelectLabel>
              {headers.map(header => (
                <SelectItem value={header} key={header}>
                  {header}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Box>

      <Input
        type="search"
        placeholder="Search all columns..."
        className="w-1/2"
        onChange={evt => setSearch(evt.target.value)}
        onKeyDown={evt => {
          if (evt.key === 'Enter') {
            onSearch({ searchBy: 'all', search })
          }
        }}
      />
    </HStack>
  )
}
