import { Box, Text, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import questions from '../../common/questions.json'

export interface RenderDataProps {
  // number of data items to display per page
  readonly pageSize: number
  readonly totalItems: number
  readonly currentPage: number
}

export const RenderData: React.FC<RenderDataProps> = ({
  pageSize,
  totalItems,
  currentPage,
}) => {
  const [data, setData] = useState(
    questions.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  )
  useEffect(() => {
    setData(questions.slice(setStartIndex(), setEndIndex()))
  }, [currentPage])

  const setStartIndex = () => {
    if ((currentPage - 1) * pageSize > totalItems) {
      return totalItems
    }
    return (currentPage - 1) * pageSize
  }

  const setEndIndex = () => {
    if (currentPage * pageSize > totalItems) {
      return totalItems + 1
    }
    return currentPage * pageSize
  }

  return (
    <Stack margin={2}>
      {data.map(item => (
        <Box
          key={item.id}
          color="#4c473f"
          bg="#ffefd5"
          borderRadius="10px"
          p={1}
          shadow="md"
          borderWidth="1px"
          _hover={{ bg: '#e5d7bf' }}
        >
          <Text>{item.id}</Text>
          <Text>{item.text}</Text>
        </Box>
      ))}
    </Stack>
  )
}
