import { PopoverContent } from '@radix-ui/react-popover'
import {
  Button,
  Popover,
  PopoverTrigger,
  TableHead,
  TableHeader,
  TableRow,
  VStack,
} from 'devfractal'

export function DataHeader({
  onOrder,
}: {
  onOrder: (value: { key: string; order: 'asc' | 'desc' }) => void
}): JSX.Element {
  return (
    <TableHeader className="bg-gray-900 sticky top-0">
      <TableRow>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} header="title" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} header="price" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} header="brand" />
        </TableHead>
        <TableHead className="text-center">
          <HeaderWrapper onOrder={onOrder} header="category" />
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

function HeaderWrapper({
  header,
  onOrder,
}: {
  header: string
  onOrder: (value: { key: string; order: 'asc' | 'desc' }) => void
}): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="capitalize">
          {header}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-gray-700 p-2 mt-2 rounded-md shadow-xl">
        <VStack className="items-center gap-y-4">
          <Button onClick={() => onOrder({ key: header, order: 'asc' })}>
            Filter Asc
          </Button>
          <Button onClick={() => onOrder({ key: header, order: 'desc' })}>
            Filter Desc
          </Button>
          <Button>Search in Column (WIP)</Button>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}
