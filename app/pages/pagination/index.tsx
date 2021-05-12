import React from 'react'

import { Pagination } from '../../components/Pagination'

export default function Index() {
  return (
    <Pagination
      color="blue"
      bg="teal"
      shape="round"
      size="md"
      variant="outline"
      count={15}
      siblingCount={2}
      showFirstButton
      showLastButton
    />
  )
}
