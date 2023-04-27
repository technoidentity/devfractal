import { Box, Input, Text } from '@chakra-ui/react'
import { cstate } from '@srtp/local-state'
import React, { type ChangeEvent } from 'react'

const initial = { step: 1, count: 0 }

const useStep = cstate(initial, {
  next: () => state => {
    state.count += state.step
  },

  setStep: (evt: ChangeEvent<HTMLInputElement>) => state => {
    state.step = +evt.target.value
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
      <Input onChange={setStep} />
    </Box>
  )
}
