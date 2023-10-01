import { TableBody, TableCell, TableRow } from 'devfractal'
import { type Products } from '../products'

export function DataBody({ data }: { data: Products }): JSX.Element {
  return (
    <TableBody>
      {data.map(product => {
        return (
          <TableRow key={product.id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
