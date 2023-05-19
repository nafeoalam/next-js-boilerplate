import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { ThemeContextProvider } from '@/shared/context/ThemeContext'
import { useThemeMode } from '@/shared/theme/useThemeMode'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'

const App = ({ Component, pageProps }: AppProps) => {
  const { theme, mode, changeThemeMode } = useThemeMode()

  return (
    <ThemeContextProvider value={{ mode, changeThemeMode }}>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
          <Analytics />
        </ReduxProvider>
      </ThemeProvider>
    </ThemeContextProvider>
  )
}

export default App
