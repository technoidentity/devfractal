/*  
 {
    headers: [
        {
            name:
            colsSpan:
            rowSpan:
        },
        ....
    ],

    body: [
        {
            title: 
            price:
            brand:
            category:
        },
        ...
    ]
 }
*/

import { TableHead, TableHeader, TableRow } from 'devfractal'

// const headers = [
//   {
//     name: 'Title',
//   },
//   {
//     name: 'Price',
//   },
//   {
//     name: 'Brand',
//   },
//   {
//     name: 'Category',
//   },
// ]

// @TODO: To use MenuBar component for providing more features!
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
