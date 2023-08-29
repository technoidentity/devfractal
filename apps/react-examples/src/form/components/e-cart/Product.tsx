import { Button, Container, Flex, Table, Text } from '@mantine/core'

import { ProductModalView } from './ProductView'

export interface Product {
  readonly id?: string
  readonly name: string
  readonly price: number
  readonly quantity: number
  readonly category: string
}

interface ProductProps {
  readonly product: Product
  onAddProduct(product: Product): void
}

export const ProductView = ({ product, onAddProduct }: ProductProps) => {
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

interface ProductListProps {
  readonly productList: ReadonlyArray<Product>
  onAddProduct(product: Product): void
  onProductView(product: Product): void
}

export const ProductList: React.FC<ProductListProps> = ({
  productList,
  onAddProduct,
  // onProductView,
}) => {
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
          <ProductView
            key={product.id}
            product={product}
            onAddProduct={onAddProduct}
          />
        ))}
      </tbody>
    </Table>
  )
}

export interface CartItem {
  readonly product: Product
  readonly count: number
}

interface CartItemProps {
  readonly cartItem: CartItem
  onRemoveItem(cartItem: CartItem): void
  onInc(cartItem: CartItem): void
  onDec(cartItem: CartItem): void
}

export const CartItemView = ({
  cartItem,
  onRemoveItem,
  onInc,
  onDec,
}: CartItemProps) => {
  return (
    <tr>
      <td>{cartItem.product.name}</td>
      <td>{cartItem.product.price}</td>
      <td>
        <Flex align="center">
          <Button color={'red'} size="xs" onClick={() => onDec(cartItem)}>
            -
          </Button>
          <Text fw="bold" m="md">
            {cartItem.count}
          </Text>
          <Button color={'green'} size="xs" onClick={() => onInc(cartItem)}>
            +
          </Button>
        </Flex>
      </td>
      <td>{cartItem.count * cartItem.product.price}</td>
      <td>
        <Button onClick={() => onRemoveItem(cartItem)}>remove</Button>
      </td>
    </tr>
  )
}

interface CartListProps {
  readonly cartList: ReadonlyArray<CartItem>
  onRemoveItem(cartItem: CartItem): void
  onInc(cartItem: CartItem): void
  onDec(cartItem: CartItem): void
}

export const CartList: React.FC<CartListProps> = ({
  cartList,
  onRemoveItem,
  onInc,
  onDec,
}) => {
  return (
    <Flex direction="column" justify="center" align="center" h="30vh">
      <h2>Cart items</h2>
      <Container>
        <Table withColumnBorders withBorder>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Count</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(item => (
              <CartItemView
                key={item.product.id}
                cartItem={item}
                onRemoveItem={onRemoveItem}
                onInc={onInc}
                onDec={onDec}
              />
            ))}
          </tbody>
        </Table>
      </Container>
      <h4>
        Total cart price:
        {cartList.reduce((acc, v) => acc + v.product.price * v.count, 0)}
      </h4>

      <hr />
    </Flex>
  )
}
