import { createRoot as reactCreateRoot } from 'react-dom/client'
import invariant from 'tiny-invariant'

export function createRoot(elementId: string) {
  const container = document.getElementById('root')
  invariant(container, `Root element(${elementId}) not found`)
  return reactCreateRoot(container)
}
