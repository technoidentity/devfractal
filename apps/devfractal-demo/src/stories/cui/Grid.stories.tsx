import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid, Text, VStack, chain, map, range } from 'devfractal'

const meta: Meta<typeof Grid> = {
  title: 'Grid',
  component: Grid,
}

export default meta

type Story = StoryObj<typeof Grid>
export const ListGrid: Story = {
  args: {
    className: 'gap-y-4 ',
  },

  render: args => {
    return (
      <Grid {...args}>
        {chain(
          range(0, 10),
          map(_ => [faker.string.uuid(), faker.lorem.sentence()]),
          map(([id, text]) => (
            <Text key={id} className="border-2 rounded-xl p-4">
              {text}
            </Text>
          )),
        )}
      </Grid>
    )
  },
}

function TextCard(): JSX.Element {
  return (
    <VStack className="justify-center items-start gap-y-4 border-2 p-4 rounded-2xl">
      <Text className="text-center text-lg font-semibold">
        {faker.word.words(1)}
      </Text>
      <Text>{faker.word.words(5)}</Text>
      <Text>{faker.lorem.sentences()}</Text>
    </VStack>
  )
}

export const CardGrid: Story = {
  args: {
    numItemsLg: 3,
    numItemsMd: 2,
    numItemsSm: 1,
    className: 'gap-4',
  },

  render: args => (
    <Grid {...args}>
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
      <TextCard />
    </Grid>
  ),
}
