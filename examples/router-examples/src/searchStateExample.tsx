import { jstr, number, spec } from '@srtp/core'
import { ReactProvider } from '@srtp/react'
import { searchState } from '@srtp/router'
import { Button, Code, Container, Flex, H1 } from '@srtp/ui'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const Numbers = spec({
  positive: number(),
  negative: number(),
})

const useNumbersSearch = searchState(Numbers, {
  action(state, by: number) {
    if (by > 0) {
      state.positive += by
      state.negative -= by
    } else if (by < 0) {
      state.positive -= by * 2
      state.negative += by * 2
    }
  },
  reset(state) {
    state.positive = 0
    state.negative = 0
  },
})

const SearchStateExample = () => {
  const [state, actions] = useNumbersSearch()

  return (
    <Container className="p-4">
      <Flex className="gap-2">
        <Code>{jstr(state)}</Code>
        <Button onClick={() => actions.action(1)}>+1</Button>
        <Button onClick={() => actions.action(-1)}>-1</Button>
        <Button onClick={() => actions.reset()}>Reset</Button>
      </Flex>
    </Container>
  )
}

const router = createBrowserRouter([
  {
    path: '*',
    element: <SearchStateExample />,
  },
])

const ErrorFallback = () => <H1>Something went wrong</H1>
const SuspenseFallback = <H1>Loading...</H1>

export const SearchApp = () => {
  return (
    <ReactProvider
      ErrorFallback={ErrorFallback}
      suspenseFallback={SuspenseFallback}
    >
      <RouterProvider router={router} />
    </ReactProvider>
  )
}
