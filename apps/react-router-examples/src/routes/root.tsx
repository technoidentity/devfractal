import { Box, Heading } from '@chakra-ui/react'

import type { RouteObject } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { rootIndexRouter } from './rootIndex'
import { authorsRouter } from './authors'
import { aboutRouter } from './about'

export const rootRouter: RouteObject = {
  path: '/',
  children: [rootIndexRouter, aboutRouter, authorsRouter],
  element: (
    <Box p="10">
      <Heading pb={2}>Books Library</Heading>
      <Outlet />
    </Box>
  ),
}
