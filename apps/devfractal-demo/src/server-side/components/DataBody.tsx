import { faker } from '@faker-js/faker'
import { TableBody, TableCell, TableRow, keys } from 'devfractal'

// @TODO: Improve generics
export function DataBody({ data }: { data: Array<object> }): JSX.Element {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map(product => {
          return (
            <TableRow key={faker.string.uuid()}>
              {keys(product)
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
