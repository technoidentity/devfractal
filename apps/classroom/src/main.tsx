import { AppProvider, createRoot } from 'devfractal'

import { App } from './App'
import './global.css'

const root = createRoot('root')

root.render(
  <AppProvider>
    <App />
  </AppProvider>,
)
