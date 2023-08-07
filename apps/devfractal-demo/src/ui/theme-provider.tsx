import { context } from '@srtp/react'
import { useEffect, useMemo, useState } from 'react'

type ThemeProvider = Readonly<{
  theme: string
  setTheme: (theme: string) => void
}>

const errorMessage = 'setTheme must be used within a ThemeProvider'
const initialValue: ThemeProvider = {
  theme: 'system',
  setTheme: () => {
    throw new Error(errorMessage)
  },
}

const [ThemeProviderContext, useTheme] = context<ThemeProvider>({
  initialValue,
  errorMessage,
})

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}>

function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: string) => {
        localStorage.setItem(storageKey, theme)
        setTheme(theme)
      },
    }),
    [storageKey, theme],
  )

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  )
}

export { ThemeProvider, useTheme }
