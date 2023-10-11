import { TableBody, TableCell, TableRow } from 'devfractal'

// @TODO: Improve generics
export function DataBody<
  T extends { id: number; [k: string]: number | string },
>({ data }: { data: readonly T[] }): JSX.Element {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map(product => {
          return (
            <TableRow key={product.id}>
              {Object.keys(product)
                .filter(key => key !== 'id')
                .map(item => {
                  return <TableCell key={item}>{product[item]}</TableCell>
                })}
            </TableRow>
          )
        })
      ) : (
        <TableRow>
          <TableCell colSpan={4}>No data!</TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
