import { Box, Button, Heading, Input } from '@chakra-ui/react'

import type { RouteObject } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { authorsRouter } from './4.authors'
// import { ConformExample } from './5.conform'
import { aboutRouter } from './about'
import { rootIndexRouter } from './rootIndex'

import { conform, useForm } from '@conform-to/react'
import { SignupForm } from './6.SearchForm'

function Product() {
  const [form] = useForm({
    onSubmit(event, { submission }) {
      event.preventDefault()

      // This will log `add-to-cart` or `buy-now`
      console.log(submission.intent)

      // This will log `{ productId: 'rf23g43' }`
      console.log(submission.payload)
    },
  })

  return (
    <form {...form.props}>
      <Input type="hidden" name="productId" value="rf23g43" />
      <Button type="submit" name={conform.INTENT} value="add-to-cart">
        Add to Cart
      </Button>
      <Button type="submit" name={conform.INTENT} value="buy-now">
        Buy now
      </Button>
    </form>
  )
}

export const rootRouter: RouteObject = {
  path: '/',
  children: [
    rootIndexRouter,
    aboutRouter,
    authorsRouter,
    // { path: 'form', element: <ConformExample /> },
    { path: 'product', element: <Product /> },
    { path: 'signup', element: <SignupForm /> },
    { path: '*', element: <h1>Not Found</h1> },
  ],
  element: (
    <Box p="10">
      <Heading pb={2}>Books Library</Heading> <Outlet />{' '}
    </Box>
  ),
}
