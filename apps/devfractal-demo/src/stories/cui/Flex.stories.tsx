import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex, Text } from 'devfractal'

const meta: Meta<typeof Flex> = {
  title: 'Flex',
  component: Flex,
}

export default meta

type Story = StoryObj<typeof Flex>

export const SimpleCard: Story = {
  args: {
    className:
      'flex-col justify-center items-start gap-y-4 border-2 rounded-2xl p-4 shadow-md',
  },

  render: args => (
    <Flex {...args}>
      <Text className="text-center text-lg font-semibold">
        {faker.word.words(1)}
      </Text>
      <Text>{faker.word.words(5)}</Text>
      <Text>{faker.lorem.sentences()}</Text>
    </Flex>
  ),
}
