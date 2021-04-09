import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import type { Task } from '../../common'

export const TaskItem: React.FC<Task> = ({ title, description }) => (
  <Box
    color="#4c473f"
    bg="#ffefd5"
    borderRadius="10px"
    p={7}
    shadow="md"
    borderWidth="1px"
    _hover={{ bg: '#e5d7bf' }}
  >
    <Heading>{title}</Heading>
    <Text mt={4}>{description}</Text>
  </Box>
)
