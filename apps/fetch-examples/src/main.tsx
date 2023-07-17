import { createRoot } from 'react-dom/client'

import invariant from 'tiny-invariant'
import { App } from './App'
import './fetch/restQueries'
import './index.css'

const container = document.getElementById('root')
invariant(container, 'Root container not found')
const root = createRoot(container)

root.render(<App />)
