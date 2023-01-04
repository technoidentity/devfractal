import { Box } from '@chakra-ui/react'
import React from 'react'
import { Pagination } from '../../components/Pagination'

export default function Index() {
  return (
    <>
      <Box
        textAlign="center"
        mx="10px"
        my="10px"
        p="10px"
        maxW="100%"
        maxH="100%"
        color="teal"
        borderWidth="1px"
        borderRadius="xl"
        borderColor="Black"
        boxShadow="lg"
      >
        {/* <RenderData
          pageSize={pageSize}
          totalItems={totalItems}
          currentPage={currentPage}
        /> */}

        <Pagination siblingCount={3} count={10} />
      </Box>
    </>
  )
}
