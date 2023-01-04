import { useEffect, useRef } from 'react'

// custom hook for detecting mouse clicks(i.e., when the user click outside of particular div or element)
export const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const maybeHandler = (event: { target: any }) => {
      if (!domNode.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })
  return domNode
}
