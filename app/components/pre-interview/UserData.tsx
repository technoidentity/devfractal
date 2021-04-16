import React from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Heading,
  VStack,
  StackDivider,
} from '@chakra-ui/react'

import type { User } from '../../common'
import isAdmin from '../../common/isAdmin'

interface UserDataProps {
  readonly userDetails: readonly User[]
}

const UserData: React.FC<UserDataProps> = ({ userDetails }) => {
  if (!isAdmin()) {
    return <Heading>Permission Denied</Heading>
  }
  return (
    <Flex alignItems="center" justifyContent="center" m="10">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={8}
        align="stretch"
      >
        <Box textAlign="center">
          <Heading>User Details</Heading>
        </Box>

        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Email ID</Th>
              <Th isNumeric>score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userDetails.map((row, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{row.email}</Td>
                <Td isNumeric>{row.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Flex>
  )
}
export default UserData
