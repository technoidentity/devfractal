import { createRoot } from 'devfractal'

import { App } from './App'
import { Provider } from '@/Provider'
import './global.css'

const root = createRoot('root')

root.render(
  <Provider>
    <App />
  </Provider>,
)
