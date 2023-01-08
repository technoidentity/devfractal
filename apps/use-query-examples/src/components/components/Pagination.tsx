import { Button, ButtonGroup, Center, Text } from '@chakra-ui/react'

export type PaginationProps = Readonly<{
  // first page is 1
  current: number
  pageCount: number
  onPageChange(page: number): void
}>

export const Pagination = ({
  current,
  pageCount,
  onPageChange,
}: PaginationProps) => (
  <ButtonGroup>
    <Center>
      <Text>
        ({current} of {pageCount})
      </Text>
    </Center>

    <Button disabled={current <= 1} onClick={() => onPageChange(1)}>
      First
    </Button>

    <Button
      disabled={current <= 1}
      onClick={() => onPageChange(Math.max(current - 1, 0))}
    >
      Previous
    </Button>

    <Button
      disabled={current >= pageCount}
      onClick={() => onPageChange(Math.min(current + 1, pageCount))}
    >
      Next
    </Button>

    <Button
      disabled={current >= pageCount}
      onClick={() => onPageChange(pageCount)}
    >
      Last
    </Button>
  </ButtonGroup>
)
