import React from 'react'

import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
} from '@chakra-ui/react'

export const Questions = () => (
  <Flex alignItems="left" justifyContent="center" m="20">
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <Box textAlign="left">
        <Heading>Questions</Heading>
      </Box>
      <Box>
        <Text fontSize="lg">What are the new features added in Java 8?</Text>
      </Box>
    </VStack>
  </Flex>
)
