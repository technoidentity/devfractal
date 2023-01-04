import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { sliceHook } from '@srtp/reducer'

const initial = { step: 1, count: 0 }

const useStep = sliceHook(initial, {
  next(draft) {
    draft.count++
  },
  setStep(draft, step) {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    draft.step = step
  },
})

export const Counter = () => {
  const [{ count }, { next, setStep }] = useStep()

  React.useEffect(() => {
    const id = setInterval(() => {
      next()
    }, 1000)

    return () => clearInterval(id)
  }, [next])

  return (
    <Box>
      <Text>{count}</Text>
      <Input onChange={evt => setStep(+evt.target.value)} />
    </Box>
  )
}
