import { Heading, Box } from '@chakra-ui/react'

import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const rootRouter: RouteObject = {
  path: '/',
  element: (
    <Box>
      <Heading>Hello World</Heading>
      <Link to="app">About Us</Link>
    </Box>
  ),
}
