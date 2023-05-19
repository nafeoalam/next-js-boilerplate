import { PaletteMode } from '@mui/material'
import { createContext } from 'react'

type ThemeContextType = {
  mode: PaletteMode
  // eslint-disable-next-line no-unused-vars
  changeThemeMode?: () => void
}

const localStorageKey = 'ecom-boilerplate-theme-mode'
export const getLocalStorageThemeMode = (): PaletteMode => {
  if (typeof window === 'undefined') return 'light'
  const mode = localStorage.getItem(localStorageKey)
  return mode === 'dark' ? 'dark' : 'light'
}

export const setLocalStorageThemeMode = (mode: PaletteMode) => {
  if (typeof window === 'undefined') return 'light'
  localStorage.setItem(localStorageKey, mode)
}

const ThemeContext = createContext<ThemeContextType>({
  mode: getLocalStorageThemeMode(),
})

const { Provider: ThemeContextProvider } = ThemeContext

export { ThemeContext, ThemeContextProvider }
