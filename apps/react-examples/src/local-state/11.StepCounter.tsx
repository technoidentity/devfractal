import { Box, Input, Text } from '@chakra-ui/react'
import type { PropsStateHandlers } from '@srtp/react'
import { usePropsState } from '@srtp/react'
import React from 'react'

const initial = { count: 0 }

type State = typeof initial
type Props = { step: number }

const handlers = {
  next: () => (state, props) => {
    state.count += props.step
  },
  prev: (x: number) => (state, props) => {
    state.count -= props.step - x
  },
} satisfies PropsStateHandlers<Props, State>

const useSecondInterval = (next: () => void) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      next()
    }, 1000)

    return () => clearInterval(id)
  }, [next])
}

export const StepCounter = (props: Props) => {
  const [{ count }, { next, prev }] = usePropsState(handlers, props, initial)

  useSecondInterval(next)

  return (
    <Box onClick={() => prev(5)}>
      <Text>{count}</Text>
    </Box>
  )
}

export const StepCounterApp = () => {
  const [step, setStep] = React.useState(1)

  return (
    <Box>
      <StepCounter step={step} />
      <Input type="number" onChange={e => setStep(_ => +e.target.value)} />
    </Box>
  )
}
