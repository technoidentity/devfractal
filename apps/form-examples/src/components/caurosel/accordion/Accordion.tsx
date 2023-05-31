import { state } from '@srtp/local-state'
import { AccordionView } from './AccordianView'

const useAccordian = state(
  { state: 'about' },
  {
    toggle: ({ state }) => (state === 'ety' ? 'about' : 'ety'),
  },
)

export const Accordian = () => {
  const [{ state }, { toggle }] = useAccordian()

  return (
    <AccordionView
      showAbout={state === 'about'}
      showEty={state === 'ety'}
      onAboutClick={toggle}
    />
  )
}
