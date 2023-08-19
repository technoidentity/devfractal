import { Button, Group } from '@mantine/core'
import { map, pipe, range, toArray } from '@srtp/fn'

interface StepCountProps {
  readonly count: number
  readonly idx: number
  onClick(idx: number): void
}

export const StepCount: React.FC<StepCountProps> = ({
  count,
  idx,
  onClick,
}) => {
  return (
    <Button
      p={6}
      // b="2px solid teal"
      // borderRadius={20}
      fw="extrabold"
      fs="xl"
      // _hover={{ bgColor: 'teal.300', color: 'black' }}
      onClick={() => onClick(idx)}
    >
      {count}
    </Button>
  )
}

interface StepsViewProps {
  readonly stepCount: number
  onClick(idx: number): void
}

export const StepsView: React.FC<StepsViewProps> = ({ stepCount, onClick }) => {
  return (
    <Group mt={6} p={3}>
      {pipe(
        range(stepCount),
        map(step => (
          <StepCount key={step} count={step} idx={step} onClick={onClick} />
        )),
        toArray,
      )}
    </Group>
  )
}
