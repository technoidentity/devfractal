import {
  Button,
  Center,
  Container,
  Flex,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { useAction, useValue } from '@srtp/global-state'
import type { Product } from './ProductList'
import {
  cartAtom,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  totalCartPrice,
} from './state'

export interface CartItem {
  readonly product: Product
  readonly count: number
}

interface CartItemProps {
  readonly cartItem: CartItem
}

export const CartItemView = ({ cartItem }: CartItemProps) => {
  const onRemoveItem = useAction(removeFromCart)
  const onInc = useAction(incrementQuantity)
  const onDec = useAction(decrementQuantity)

  return (
    <tr>
      <td>{cartItem.product.name}</td>
      <td>{cartItem.product.price}</td>
      <td>
        <Flex align="center">
          <Button
            color={'red'}
            disabled={cartItem.count <= 1}
            size="xs"
            onClick={() => onDec(cartItem)}
          >
            -
          </Button>
          <Text fw="bold" m="md">
            {cartItem.count}
          </Text>
          <Button
            color={'green'}
            disabled={cartItem.product.quantity <= cartItem.count}
            size="xs"
            onClick={() => onInc(cartItem)}
          >
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
  const totalPrice = useValue(totalCartPrice)

  return (
    <ScrollArea style={{ height: 250 }}>
      <Flex direction="column" justify="center" align="center" gap="md">
        <Title order={4} fw="bold">
          Cart items
        </Title>
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
        <Center>
          <Title order={6}>
            Total cart price:
            {totalPrice}
          </Title>
        </Center>
      </Flex>
    </ScrollArea>
  )
}
