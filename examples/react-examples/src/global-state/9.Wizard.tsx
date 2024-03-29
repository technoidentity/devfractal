import { Button, ButtonGroup, Container } from '@chakra-ui/react'
import { context } from '@srtp/react'
import React from 'react'

type WizardContext = {
  activePageIdx: number
  steps: number
  handlePrevious(): void
  handleNext(): void
  setSteps(steps: number): void
}

const [WizardContext, useWizard] = context<WizardContext>({
  errorMessage: 'missing WizardContext Provider',
})

export const ButtonPrev = () => {
  const { handlePrevious, activePageIdx } = useWizard()
  return (
    <Button onClick={handlePrevious} disabled={activePageIdx <= 0}>
      Prev
    </Button>
  )
}

export const ButtonNext = () => {
  const { handleNext, activePageIdx, steps } = useWizard()

  return (
    <Button onClick={handleNext} disabled={activePageIdx >= steps - 1}>
      Next
    </Button>
  )
}

export const WizardButtons = () => {
  return <ButtonGroup></ButtonGroup>
}

type PagesProps = {
  children: React.ReactNode
}

export const Pages = ({ children }: PagesProps) => {
  const { activePageIdx, setSteps } = useWizard()

  const pages = React.Children.toArray(children)
  const steps = React.Children.count(children)

  React.useEffect(() => {
    setSteps(steps)
  }, [steps, setSteps])

  const currentPage = pages[activePageIdx]
  return <Container>{currentPage}</Container>
}

type InitialState = {
  activePageIdx: number
  steps: number
}

const initialState: InitialState = {
  activePageIdx: 0,
  steps: 0,
}

const wizardReducer = (state: InitialState, action: any) => {
  const { activePageIdx } = state
  switch (action.type) {
    case 'PREVIOUS': {
      return { ...state, activePageIdx: activePageIdx - 1 }
    }
    case 'NEXT': {
      return { ...state, activePageIdx: activePageIdx + 1 }
    }
    case 'SET_STEPS': {
      return { ...state, steps: action.payload }
    }
    default:
      return state
  }
}

interface WizardProps {
  children: React.ReactNode
}
export const Wizard = ({ children }: WizardProps) => {
  const [{ activePageIdx, steps }, dispatch] = React.useReducer(
    wizardReducer,
    initialState,
  )

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS' })
  }
  const handleNext = () => {
    dispatch({ type: 'NEXT' })
  }

  const setSteps = React.useCallback(
    (n: number) => {
      dispatch({ type: 'SET_STEPS', payload: n })
    },
    [dispatch],
  )

  const context = React.useMemo(
    () => ({
      activePageIdx,
      handlePrevious,
      handleNext,
      steps,
      setSteps,
    }),
    [activePageIdx, setSteps, steps],
  )

  return (
    <WizardContext value={context}>
      <Container w="400px">{children}</Container>
    </WizardContext>
  )
}

Wizard.Pages = Pages
Wizard.ButtonNext = ButtonNext
Wizard.ButtonPrev = ButtonPrev
