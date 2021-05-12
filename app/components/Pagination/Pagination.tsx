/* eslint-disable no-console */
import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
export interface PaginationProps {
  readonly color?:
    | 'blue'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'
  readonly bg?:
    | 'blue'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'

  // total number of pages
  readonly count?: number
  readonly shape?: 'rounded' | 'round'
  readonly hideNextButton?: boolean
  readonly hidePrevButton?: boolean
  readonly showFirstButton?: boolean
  readonly showLastButton?: boolean

  // number of page number to display on either side of current page
  readonly siblingCount?: number
  readonly size?: 'sm' | 'md' | 'lg' | 'xs'
  readonly variant?: 'link' | 'outline' | 'solid' | 'ghost'
}
export const Pagination: React.FC<PaginationProps> = ({
  color = 'green',
  bg = 'red',
  count = 15,
  shape = 'rounded',
  hideNextButton = false,
  hidePrevButton = false,
  showFirstButton = true,
  showLastButton = true,
  siblingCount = 3,
  size = 'sm',
  variant = 'ghost',
}) => {
  const first = '<<',
    last = '>>',
    prev = '<',
    next = '>'
  const initialPageNumbers = new Array(1 + siblingCount * 2)
    .fill(0)
    .map((_, index) => index + 1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageNumbers, setPageNumbers] = useState(initialPageNumbers)

  useEffect(() => {
    adjustPageNumbers()
  }, [currentPage])

  const generatePageNumbers = (factor: number) =>
    new Array(1 + siblingCount * 2)
      .fill(0)
      .map((_, index) => index + currentPage + factor)

  const adjustPageNumbers = () => {
    if (currentPage === 1) {
      setPageNumbers(generatePageNumbers(0))
    } else if (
      currentPage > siblingCount &&
      currentPage < count - siblingCount
    ) {
      setPageNumbers(generatePageNumbers(-1 * siblingCount))
    } else if (currentPage === count - 1) {
      setPageNumbers(generatePageNumbers(-1 * siblingCount - 1))
    } else if (currentPage === count) {
      setPageNumbers(generatePageNumbers(-2 * siblingCount))
    }
  }
  const onFirst = () => {
    setCurrentPage(1)
  }
  const onLast = () => {
    setCurrentPage(count)
  }
  const onPrev = () => {
    if (currentPage === 1) {
      return
    }
    setCurrentPage(currentPage => currentPage - 1)
  }
  const onNext = () => {
    if (currentPage === count) {
      return
    }
    setCurrentPage(currentPage => currentPage + 1)
  }

  const onPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentPage(parseInt(event.currentTarget.value, 10))
  }

  return (
    <>
      <Box
        textAlign="center"
        mx="50px"
        my="20px"
        p="40px"
        maxW="100%"
        maxH="100%"
        color="teal"
        borderWidth="1px"
        borderRadius="xl"
        borderColor="Black"
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Pagination</Heading>
        </Box>
        {showFirstButton && (
          <Button
            bg={`${bg}.200`}
            color={color}
            size={size}
            variant={variant}
            borderRadius={shape === 'rounded' ? '10px' : 'full'}
            mx={3}
            onClick={onFirst}
            isDisabled={currentPage === 1 ? true : false}
          >
            {first}
          </Button>
        )}
        {!hidePrevButton && (
          <Button
            bg={`${bg}.200`}
            color={color}
            size={size}
            variant={variant}
            borderRadius={shape === 'rounded' ? '10px' : 'full'}
            mr={3}
            isDisabled={currentPage === 1 ? true : false}
            onClick={onPrev}
          >
            {prev}
          </Button>
        )}

        {pageNumbers.map((item, index) => (
          <Button
            key={index}
            bgGradient={
              currentPage === item ? 'linear(to-r, pink.500, pink.700)' : ''
            }
            bg={`${bg}.200`}
            value={item}
            colorScheme={color}
            size={size}
            variant={variant}
            borderRadius={shape === 'rounded' ? '10px' : 'full'}
            mr={3}
            _hover={{
              bg: `${bg}.400`,
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 'lg',
            }}
            _focus={{
              outline: 'none',
            }}
            onClick={event => onPage(event)}
          >
            {item}
          </Button>
        ))}

        {!hideNextButton && (
          <Button
            bg={`${bg}.200`}
            color={color}
            size={size}
            variant={variant}
            borderRadius={shape === 'rounded' ? '10px' : 'full'}
            mr={3}
            isDisabled={currentPage === count ? true : false}
            onClick={onNext}
          >
            {next}
          </Button>
        )}
        {showLastButton && (
          <Button
            bg={`${bg}.200`}
            color={color}
            size={size}
            variant={variant}
            borderRadius={shape === 'rounded' ? '10px' : 'full'}
            mr={3}
            isDisabled={currentPage === count ? true : false}
            onClick={onLast}
          >
            {last}
          </Button>
        )}
        <Heading>{currentPage}</Heading>
      </Box>
    </>
  )
}
