/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { action, useAction, useValue } from '@srtp/global-state'
import { atom } from 'jotai'

const counterAtom = atom(0)

const incAtom = action(({ set, get }) => {
  const next = get(counterAtom) + 1
  set(counterAtom, next)
})

const decAtom = action(({ set, get }) => {
  const next = get(counterAtom) - 1
  if (next >= 0) {
    set(counterAtom, next)
  }
})

const CounterView = () => {
  const count = useValue(counterAtom)

  return (
    <Text fontSize="3xl" pl="5">
      {count}
    </Text>
  )
}

const CounterActions = () => {
  const inc = useAction(incAtom)
  const dec = useAction(decAtom)

  return (
    <Box>
      <Button onClick={inc}>+</Button>
      <Button onClick={dec}>-</Button>
    </Box>
  )
}

const Header = () => {
  React.useEffect(() => {
    console.log('header')
  })

  return <Heading textAlign="center">Jotai Course</Heading>
}

export const Counter = () => (
  <Box>
    <Header />
    <CounterView />
    <CounterActions />
  </Box>
)
