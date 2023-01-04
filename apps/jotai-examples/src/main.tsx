/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { enableMapSet } from 'immer'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

enableMapSet()

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
