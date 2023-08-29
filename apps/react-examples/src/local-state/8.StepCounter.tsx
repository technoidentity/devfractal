import { Box, Input, Text } from '@chakra-ui/react'
import { isNum } from '@srtp/core'
import { pstate, type PHandlers } from '@srtp/react'
import React, { type ChangeEvent } from 'react'

const initial = { step: 1, count: 0 }

const handlers = {
  next: () => state => {
    state.count += state.step
  },

  setStep: (evt: ChangeEvent<HTMLInputElement>) => state => {
    const step = +evt.target.value || 1
    if (isNum(step)) {
      state.step = step
    }
  },
} satisfies PHandlers<typeof initial, object>

const useStep = pstate(initial, handlers)

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
      <Input type="number" onChange={setStep} />
    </Box>
  )
}
