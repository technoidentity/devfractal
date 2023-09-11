import type { Meta, StoryObj } from '@storybook/react'
import { Container, Text } from 'devfractal'

const meta = {
  title: 'Container',
  component: Container,
} satisfies Meta<typeof Container>

export default meta

type Story = StoryObj<typeof Container>

export const TextContainer = {
  render: args => (
    <Container {...args}>
      <Text>This is sample text</Text>
    </Container>
  ),
} satisfies Story
