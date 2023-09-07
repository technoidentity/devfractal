import '@/globals.css'
import { AppProvider } from 'devfractal/src/AppProvider'

export const Wrapper = ({ children }: any) => (
  <AppProvider>{children}</AppProvider>
)
