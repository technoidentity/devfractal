import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import invariant from 'tiny-invariant'

const container = document.getElementById('root')
invariant(container, 'Root element not found')

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
