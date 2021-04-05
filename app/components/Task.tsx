import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import type { TaskType } from '../common'

export const Task: React.FC<TaskType> = ({ id, title, description }) => (
  <Box
    color="#4c473f"
    bg="#ffefd5"
    borderRadius="10px"
    key={id}
    p={5}
    shadow="md"
    borderWidth="1px"
    _hover={{ bg: '#e5d7bf' }}
  >
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{description}</Text>
  </Box>
)
