/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, Group, Modal, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import type { Product } from './ProductList'

interface ProductModalViewProps {
  readonly product: Partial<Product>
}

export const ProductModalView = ({ product }: ProductModalViewProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Product details!"
        centered
      >
        <img
          src={`https://robohash.org/${product.id!}?set=set4`}
          alt="Placeholder image"
        />
        <Stack>
          <Title order={5}>Product: {product.name}</Title>
          <Title order={6}>Price: {product.price}</Title>
        </Stack>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>View Product</Button>
      </Group>
    </>
  )
}
