import React from 'react'
import { AccordionView } from './AccordianView'

type State = 'about' | 'ety'

export const Accordian = () => {
  const [state, set] = React.useState<State>('about')

  const handleAboutClick = () => {
    set(state === 'ety' ? 'about' : 'ety')
  }

  return (
    <AccordionView
      showAbout={state === 'about'}
      showEty={state === 'ety'}
      onAboutClick={handleAboutClick}
    />
  )
}
