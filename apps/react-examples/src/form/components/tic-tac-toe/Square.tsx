import { Button } from '@mantine/core'

export type Player = 'X' | 'O' | 'none'

export interface SquareProps {
  readonly value: Player
  readonly idx: number
  onClick(idx: number): void
}

// export const Value: React.FC<Partial<SquareProps>> = ({ value }) => (
//   <Heading opacity="0.5" fontWeight="extrabold" fontSize="5xl">
//     {value}
//   </Heading>
// )

// export const Dot: React.FC = () => (
//   <Text h={4} w={4} opacity="0.5" bg="teal.500" borderRadius="50%"></Text>
// )

export const SquareView = ({ value, onClick, idx }: SquareProps) => {
  return (
    <Button
      size="lg"
      p="20px"
      color="teal"
      // borderRadius={20}
      fw="extrabold"
      fs="2xl"
      w="75px"
      h="75px"
      // _hover={{ bgColor: 'teal.300', color: 'black' }}
      onClick={() => {
        onClick(idx)
      }}
    >
      {value === 'none' ? '' : value}
    </Button>
  )
}
