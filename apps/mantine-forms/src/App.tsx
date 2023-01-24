import { MantineProvider } from '@mantine/core'
// import { Carousel } from './components/caurosel/caurosel/Carousel'
// import { CartApp } from './components/e-cart/CartApp'
import { TicTacToe } from './components/tic-tac-toe/TicTacToe'
// import { StepperForm } from './components/stepper-form/StepperForm'
// import { sculptureList } from './utils/data'
// import { StepperForm } from './components/mantine-form/StepperForm'
// import { FilterableProductTable } from './components/thinking-in-react/FilterableProductTable'

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* <Text>Welcome to Mantine!</Text> */}
      {/* <FilterableProductTable /> */}
      {/* <Carousel sculptures={sculptureList} /> */}
      <TicTacToe />
    </MantineProvider>
  )
}
