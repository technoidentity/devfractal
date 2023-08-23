import { Box, Input, Text } from '@chakra-ui/react'
import { pstate, type PHandlers } from '@srtp/react'
import React from 'react'

const initial = { count: 0 }

type State = typeof initial
type Props = { step: number }

const handlers = {
  next: () => (state, props) => {
    state.count += props.step
  },
} satisfies PHandlers<State, Props>

const useStep = pstate(initial, handlers)

const useSecondInterval = (next: () => void) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      next()
    }, 1000)

    return () => clearInterval(id)
  }, [next])
}

export const StepCounter = (props: Props) => {
  const [{ count }, { next }] = useStep(props)
  useSecondInterval(next)

  return (
    <Box>
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
