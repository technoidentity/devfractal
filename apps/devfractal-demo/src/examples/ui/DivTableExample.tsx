import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from '@/div-table'

export function DivTable() {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>King's Treasury</TableHead>
            <TableHead>People's happiness</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Empty</TableCell>
            <TableCell>Overflowing</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Modest</TableCell>
            <TableCell>Satisfied</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Half</TableCell>
            <TableCell>Happy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Full</TableCell>
            <TableCell>Ecstatic</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
