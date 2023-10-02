import { TableHead, TableHeader, TableRow } from 'devfractal'

export function DataHeader(): JSX.Element {
  return (
    <TableHeader className="bg-gray-900 sticky top-0">
      <TableRow>
        <TableHead className="text-center">TITLE</TableHead>
        <TableHead className="text-center">PRICE</TableHead>
        <TableHead className="text-center">BRAND</TableHead>
        <TableHead className="text-center">CATEGORY</TableHead>
      </TableRow>
    </TableHeader>
  )
}
