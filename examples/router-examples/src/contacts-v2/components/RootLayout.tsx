import { Box } from '@srtp/ui'
import { Outlet } from 'react-router-dom'

import { ListContacts } from './ListContacts'

export function RootLayout(): JSX.Element {
  return (
    <Box
      as="aside"
      className="grid grid-cols-2 px-2 text-center text-black py-2"
    >
      <ListContacts />
      <Outlet />
    </Box>
  )
}
