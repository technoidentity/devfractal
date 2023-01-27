import { Button, Container, Flex, Table, Text } from '@mantine/core'
import { useAction, useValue } from '@srtp/global-state'
import { Product } from './ProductList'
import {
  cartAtom,
  decreaseProductQuantityInCart,
  incrementProductQuantityInCart,
  removeProductFromCart,
} from './state'

export interface CartItem {
  readonly product: Product
  readonly count: number
}

interface CartItemProps {
  readonly cartItem: CartItem
}

export const CartItemView = ({ cartItem }: CartItemProps) => {
  const onRemoveItem = useAction(removeProductFromCart)
  const onInc = useAction(incrementProductQuantityInCart)
  const onDec = useAction(decreaseProductQuantityInCart)

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

export const CartList = () => {
  const cartList = useValue(cartAtom)

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
              <CartItemView key={item.product.id} cartItem={item} />
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
