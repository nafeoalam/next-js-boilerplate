import {
  getLocalStorageThemeMode,
  setLocalStorageThemeMode,
} from '@/shared/context/ThemeContext'
import { getTheme } from '@/shared/theme'
import { PaletteMode } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useThemeMode = () => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const changeThemeMode = useCallback(() => {
    const updatedMode = mode === 'light' ? 'dark' : 'light'
    setMode(updatedMode)
    setLocalStorageThemeMode(updatedMode)
  }, [mode])

  useEffect(() => {
    const localStorageThemeMode = getLocalStorageThemeMode()
    setMode(localStorageThemeMode)
  }, [])

  const theme = useMemo(() => {
    return getTheme(mode)
  }, [mode])

  return { theme, mode, changeThemeMode }
}
