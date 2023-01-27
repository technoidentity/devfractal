import { slice } from '@srtp/local-state'
import { AccordionView } from './AccordianView'

type State = 'about' | 'ety'

const initial = 'about'

const useAccordian = slice(initial as State, {
  toggle: state => (state === 'ety' ? 'about' : 'ety'),
})

export const Accordian = () => {
  const [state, { toggle }] = useAccordian()

  return (
    <AccordionView
      showAbout={state === 'about'}
      showEty={state === 'ety'}
      onAboutClick={toggle}
    />
  )
}
