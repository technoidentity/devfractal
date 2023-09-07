import {
  Checkbox,
  Container,
  H1,
  H2,
  H3,
  HStack,
  Input,
  Label,
  Text,
  VStack,
  useUpdate,
} from 'devfractal'

export const UpdateExample = () => {
  const [state, actions] = useUpdate({ num: 0, str: '', bool: false })

  return (
    <VStack className="m-8 gap-4 w-96">
      <H3>useUpdate Example</H3>
      <Input
        type="number"
        value={state.num}
        onChange={evt => actions.setNum(+evt.target.value)}
      />
      <Input
        type="text"
        value={state.str}
        onChange={evt => actions.setStr(evt.target.value)}
      />
      <HStack>
        <Checkbox
          checked={state.bool}
          onCheckedChange={value => actions.setBool(!!value)}
        />
        <Label className="ml-2">Foo Bar</Label>
      </HStack>
    </VStack>
  )
}
