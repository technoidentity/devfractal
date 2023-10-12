import {
  Button,
  HStack,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from 'devfractal'

// @TODO: Add prop types
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onSetLimit,
  onNext,
  onPrev,
  onFirst,
  onLast,
}: {
  currentPage: number
  totalPages: number
  limit: number
  totalItems: number
  onSetLimit: (value: string) => void
  onNext: () => void
  onPrev: () => void
  onFirst: () => void
  onLast: (last: number) => void
}): JSX.Element {
  return (
    <HStack className="justify-between items-center w-full">
      <HStack className="items-center justify-start gap-x-2">
        <Select onValueChange={onSetLimit}>
          <SelectTrigger>
            <SelectValue defaultValue={limit} placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Text className="whitespace-nowrap block">per page</Text>

        <HStack className="justify-between items-center gap-x-2">
          <Input type="checkbox" />
          <Text className="whitespace-nowrap">Show all {totalItems}</Text>
        </HStack>
      </HStack>

      <Text className="whitespace-nowrap block">
        {currentPage} of {totalPages}
      </Text>

      <HStack className="items-center justify-center gap-x-2">
        <Button onClick={onFirst} disabled={currentPage === 1}>
          First
        </Button>
        <Button onClick={onPrev} disabled={currentPage <= 1}>
          Prev
        </Button>
        <Button onClick={onNext} disabled={currentPage >= totalPages}>
          Next
        </Button>
        <Button
          onClick={() => onLast(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </HStack>
    </HStack>
  )
}
