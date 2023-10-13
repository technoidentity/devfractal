import { Box, isArray } from 'devfractal'
import { TableVirtuoso } from 'react-virtuoso'

import { HeaderWrapper } from './DataHeaders'

// @TODO: Type mismatch with shadcn and div-table as components

export function VirtualDataTable<
  T extends { id: number; [k: string]: number | string },
>({
  data,
  headers,
  onOrder,
  onSearch,
}: {
  headers: string[]
  data: readonly T[]
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
            {Object.keys(product)
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
