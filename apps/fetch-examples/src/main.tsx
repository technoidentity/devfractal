/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import './fetch/restEndpoints'
import { App } from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
