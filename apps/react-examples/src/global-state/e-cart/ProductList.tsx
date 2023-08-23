import { Button, Table } from '@mantine/core'
import { useAction, useValue } from '@srtp/react'
import { ProductModalView } from './ProductView'
import { addToCart, filteredProductsAtom } from './state'

export interface Product {
  readonly id?: string
  readonly name: string
  readonly price: number
  readonly quantity: number
  readonly category: string
}

interface ProductProps {
  readonly product: Product
}

export const ProductView = ({ product }: ProductProps) => {
  const onAddProduct = useAction(addToCart)

  return (
    <tr style={{ border: 'solid 1px black', padding: '20px' }}>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <Button onClick={() => onAddProduct(product)}>Add to cart</Button>
      </td>
      <td>
        <ProductModalView product={product} />
      </td>
    </tr>
  )
}

export const ProductList = () => {
  const productList = useValue(filteredProductsAtom)

  return (
    <Table maw="800px" m="xl">
      <thead>
        <tr style={{ padding: '4px' }}>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {productList.map(product => (
          <ProductView key={product.id} product={product} />
        ))}
      </tbody>
    </Table>
  )
}
