import { createRoot as reactCreateRoot } from 'react-dom/client'
import invariant from 'tiny-invariant'

/**
 *
 * @param elementId root div element in html for react
 * @returns root with render method
 */
export function createRoot(elementId: string) {
  const container = document.getElementById(elementId)
  invariant(container, `Root element(${elementId}) not found`)

  return reactCreateRoot(container)
}
