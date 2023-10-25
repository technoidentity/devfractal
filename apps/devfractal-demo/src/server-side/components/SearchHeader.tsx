import {
  Command,
  CommandGroup,
  HStack,
  Input,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  CommandItem,
  cn,
} from 'devfractal'
import { Check, ChevronDown } from 'lucide-react'
import React from 'react'

import { headers } from '../products'

export function Header({
  columns,
  onSearch,
  onSelect,
}: {
  columns: string[]
  onSearch: (value: { searchBy: string; search: string }) => void
  onSelect: (header: string) => void
}): JSX.Element {
  const [search, setSearch] = React.useState('')

  return (
    <HStack className="justify-between items-center w-full">
      <Popover>
        <PopoverTrigger>
          <HStack className="justify-between items-center gap-x-4">
            <Text>Select columns for display</Text>
            <ChevronDown />
          </HStack>
        </PopoverTrigger>

        <PopoverContent>
          <Command>
            <CommandGroup>
              {headers.map(header => {
                return (
                  <CommandItem key={header} onSelect={onSelect}>
                    <HStack className="justify-between items-center w-full">
                      <Text>{header}</Text>
                      <Check
                        className={cn(
                          '',
                          columns.includes(header) ? '' : 'hidden',
                        )}
                      />
                    </HStack>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

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
