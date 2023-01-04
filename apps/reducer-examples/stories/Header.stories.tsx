import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Header } from './Header'

export default {
  title: 'Example/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => <Header {...args} />

export const LoggedIn = Template.bind({})
// eslint-disable-next-line functional/immutable-data
LoggedIn.args = {
  user: {},
}

export const LoggedOut = Template.bind({})
// eslint-disable-next-line functional/immutable-data
LoggedOut.args = {}
