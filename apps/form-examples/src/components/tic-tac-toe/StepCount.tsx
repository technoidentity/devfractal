import { Button, Group } from '@mantine/core'
import { range } from 'lodash'

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
      {range(stepCount).map((step, index) => (
        <StepCount key={step} count={step} idx={index} onClick={onClick} />
      ))}
    </Group>
  )
}
