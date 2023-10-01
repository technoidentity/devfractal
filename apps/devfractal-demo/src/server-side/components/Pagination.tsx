import {
  Button,
  HStack,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from 'devfractal'

export function Pagination(): JSX.Element {
  return (
    <HStack className="justify-between items-center gap-x-8">
      <Select
        onValueChange={() => {
          return
        }}
      >
        <SelectTrigger>
          <SelectValue defaultValue="10" />
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

      <Text className="whitespace-nowrap block">1 of 10</Text>

      <HStack className="items-center justify-center gap-x-2">
        <Button>First</Button>
        <Button>Prev</Button>
        <Button>Next</Button>
        <Button>Last</Button>
      </HStack>
    </HStack>
  )
}
