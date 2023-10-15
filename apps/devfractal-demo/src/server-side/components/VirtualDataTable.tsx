import { Box, isArray, keys } from 'devfractal'
import { TableVirtuoso } from 'react-virtuoso'

import { HeaderWrapper } from './HeaderWrapper'

// @TODO: Type mismatch with shad-cn and div-table as components -> Cannot be merged due to inconsistent html semantics
// @TODO: Need to check if only the table body can use virtual table
// @TODO: Fix styling for virtual table
export function VirtualDataTable({
  data,
  headers,
  onOrder,
  onSearch,
}: {
  headers: string[]
  data: Array<object>
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  return (
    <Box className="w-full h-screen overflow-y-auto">
      <TableVirtuoso
        data={data}
        fixedHeaderContent={() => (
          <tr>
            {isArray(headers) ? (
              headers.map(header => {
                return (
                  <th key={header} className="text-center p-4">
                    <HeaderWrapper
                      header={header}
                      onOrder={onOrder}
                      onSearch={onSearch}
                    />
                  </th>
                )
              })
            ) : (
              <th className="text-center">
                <HeaderWrapper
                  header={headers}
                  onOrder={onOrder}
                  onSearch={onSearch}
                />
              </th>
            )}
          </tr>
        )}
        itemContent={(_index, product) => (
          <>
            {keys(product)
              .filter(key => key !== 'id')
              .map(item => {
                return (
                  <td key={item} className="text-center">
                    {product[item]}
                  </td>
                )
              })}
          </>
        )}
      />
    </Box>
  )
}
