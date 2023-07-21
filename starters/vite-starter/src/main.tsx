import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import invariant from 'tiny-invariant'

const container = document.getElementById('root')
invariant(container, 'Root element not found')

const root = createRoot(container)

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')

  worker.start({ onUnhandledRequest: 'bypass' }).catch(console.error)
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
