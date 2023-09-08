import { HStack, Input, Label, Text } from 'devfractal'

export function SearchHeader({
  onFilter,
  onCheck,
}: {
  onFilter: (text: string) => void
  onCheck: (text: string) => void
}): JSX.Element {
  return (
    <HStack className="flex w-full text-white items-center justify-between rounded-t-xl bg-gray-700 p-4">
      <div className="w-[75%]">
        <Label>
          <Input
            type="text"
            name="filter"
            placeholder="Search here..."
            className="w-full rounded-full border px-4 py-2"
            onChange={e => onFilter(e.target.value)}
          />
        </Label>
      </div>
      <HStack className="flex items-center justify-evenly gap-x-4 font-semibold text-white">
        <Label htmlFor="paginate" className="flex gap-x-2 ">
          <Text>All Result</Text>
          <Input
            type="radio"
            id="paginate"
            value="scroll"
            name="paginate"
            onChange={e => onCheck(e.target.value)}
          />
          <Text>Limit Results</Text>
          <Input
            type="radio"
            id="paginate"
            name="paginate"
            value="page"
            onChange={e => onCheck(e.target.value)}
            defaultChecked
          />
        </Label>
      </HStack>
    </HStack>
  )
}
