import { PopoverContent } from '@radix-ui/react-popover'
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  TableHead,
  TableHeader,
  TableRow,
  VStack,
} from 'devfractal'
import React from 'react'

export function DataHeader({
  onOrder,
  onSearch,
  headers,
}: {
  headers: string[]
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  return (
    <TableHeader className="bg-gray-900 sticky top-0">
      <TableRow>
        {headers.map(header => {
          return (
            <TableHead key={header} className="text-center">
              <HeaderWrapper
                onOrder={onOrder}
                onSearch={onSearch}
                header={header}
              />
            </TableHead>
          )
        })}
        {/* <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} onSearch={onSearch} header="title" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} onSearch={onSearch} header="price" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} onSearch={onSearch} header="brand" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper
            onOrder={onOrder}
            onSearch={onSearch}
            header="category"
          />
        </TableHead> */}
      </TableRow>
    </TableHeader>
  )
}

function HeaderWrapper({
  header,
  onOrder,
  onSearch,
}: {
  header: string
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  const [search, setSearch] = React.useState('')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="uppercase">
          {header}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-gray-700 p-2 mt-2 rounded-md shadow-xl">
        <VStack className="items-center gap-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOrder({ sortBy: header, order: 'asc' })}
          >
            Filter Asc
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOrder({ sortBy: header, order: 'desc' })}
          >
            Filter Desc
          </Button>
          <Button variant="outline">
            <Input
              type="search"
              defaultValue={search}
              placeholder="Search..."
              autoFocus
              onChange={evt => setSearch(evt.target.value)}
              onKeyDown={evt => {
                if (evt.key === 'Enter') {
                  onSearch({ searchBy: header, search })
                }
              }}
            />
          </Button>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}
