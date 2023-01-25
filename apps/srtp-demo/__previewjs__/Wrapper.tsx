import { MantineProvider } from '@mantine/core'
import React from 'react'

export const Wrapper = ({ children }: any) => (
  <MantineProvider>{children}</MantineProvider>
)
