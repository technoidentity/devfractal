import { Box, Input, Text } from '@chakra-ui/react'
import { isNum } from '@srtp/core'
import type { PropsStateHandlers } from '@srtp/react'
import { propsState } from '@srtp/react'
import React, { type ChangeEvent } from 'react'

const initial = { step: 1, count: 0 }

type Props = { enableStep?: boolean }

const handlers = {
  next: () => state => {
    state.count += state.step
  },

  setStep: (evt: ChangeEvent<HTMLInputElement>) => (state, props) => {
    const step = +evt.target.value || 1
    if (isNum(step) && props.enableStep) {
      state.step = step
    }
  },
} satisfies PropsStateHandlers<Props, typeof initial>

const state = propsState<Props>()

const useStep = state(initial, handlers)

const useSecondInterval = (next: () => void) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      next()
    }, 1000)

    return () => clearInterval(id)
  }, [next])
}

export const StepCounter = () => {
  const [{ count }, { next, setStep }] = useStep({})
  useSecondInterval(next)

  return (
    <Box>
      <Text>{count}</Text>
      <Input type="number" onChange={setStep} />
    </Box>
  )
}
