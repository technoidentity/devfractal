import { Container, Flex, Table } from '@mantine/core'
import React from 'react'
import { categorizedProducts } from '../../utils/dataTransform'
import { Products } from '../../utils/types'
import { ProductCategoryRow } from './ProductCategoryRow'
import { ProductRow } from './ProductRow'

interface ProductTableProps {
  products: Products
}

export const ProductTable = ({ products }: ProductTableProps) => {
  const categorized = categorizedProducts(products)
  const categoryProducts = Object.entries(categorized)

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
