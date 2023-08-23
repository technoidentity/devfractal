import { Counter } from '@/components'
import { Box, Button } from '@chakra-ui/react'
import { jstr } from '@srtp/core'
import React from 'react'

const App = () => {
  const [{ min, max }, set] = React.useState({ min: 10, max: 20 })

  return (
    <Box>
      <Counter min={min} max={max} />
      <Button colorScheme="blue" onClick={() => set({ min: 0, max })}>
        Change Min
      </Button>
      <Button onClick={() => set({ min, max: 100 })} colorScheme="blue">
        Change Max
      </Button>
      <pre>{jstr({ min, max })}</pre>
    </Box>
  )
}
export default App
