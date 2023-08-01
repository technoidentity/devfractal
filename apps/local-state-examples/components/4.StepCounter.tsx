import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { state } from '@srtp/local-state'

const initial = { step: 1, count: 0 }

const useStep = state(initial, {
  next(state) {
    state.count += state.step
  },
  setStep(state, step: number) {
    state.step = step
  },
})

const useSecondInterval = (next: () => void) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      next()
    }, 1000)

    return () => clearInterval(id)
  }, [next])
}

export const StepCounter = () => {
  const [{ count }, { next, setStep }] = useStep()
  useSecondInterval(next)

  return (
    <Box>
      <Text>{count}</Text>
      <Input onChange={evt => setStep(+evt.target.value)} />
    </Box>
  )
}

export const DoubleStepCounter = () => (
  <>
    <StepCounter />
    <StepCounter />
  </>
)
