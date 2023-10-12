import { createRoot } from 'devfractal'

import { Provider } from '@/Provider'

import { App } from './App'
import './global.css'

const root = createRoot('root')

root.render(
  <Provider>
    <App />
  </Provider>,
)
