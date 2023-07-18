import { Box } from '@chakra-ui/react'
import { useMatches, type RouteObject, Outlet } from 'react-router-dom'

const About = () => {
  const matches = useMatches()

  return <pre>{JSON.stringify(matches, null, 2)}</pre>
}

export const aboutRouter: RouteObject = {
  path: 'about',
  element: (
    <Box>
      about
      <Outlet />
    </Box>
  ),
  children: [
    {
      path: ':id',
      element: <About />,
    },
  ],
}
