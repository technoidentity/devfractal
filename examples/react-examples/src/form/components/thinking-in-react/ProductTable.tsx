import { Container, Flex, Table } from '@mantine/core'
import { useValue } from '@srtp/react'
import React from 'react'

import { ProductCategoryRow } from './ProductCategoryRow'
import { ProductRow } from './ProductRow'
import { categoryProductsAtom } from './state'

export const ProductTable = () => {
  const categoryProducts = useValue(categoryProductsAtom)

  return (
    <Flex>
      <Container>
        <Table verticalSpacing={'sm'} horizontalSpacing="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {categoryProducts.map(([key, products], index) => (
              <React.Fragment key={index}>
                <ProductCategoryRow category={key} />
                {products.map(p => (
                  <ProductRow key={p.name} product={p} />
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Container>
    </Flex>
  )
}
