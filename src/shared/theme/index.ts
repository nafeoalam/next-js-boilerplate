import { Manrope, Poppins } from '@next/font/google'
import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles'
import { darkScrollbar, PaletteMode } from '@mui/material'
import { blue, grey, orange } from '@mui/material/colors'

// Create the font object to use in the theme.
export const manrope = Manrope({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Poppins', 'Helvetica', 'sans-serif'],
})

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Poppins', 'sans-serif'],
})

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary']
  }
}

const setCommonStyles = (theme: Theme) => {
  theme.components = {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#02060d',
        },
      },
    },
  }

  theme.typography.h1 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '3rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  }

  theme.typography.h2 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.875rem',
    },
  }

  theme.typography.h3 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '2.25rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  }

  theme.typography.h4 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  }

  theme.typography.h5 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
    },
  }

  theme.typography.h6 = {
    fontFamily: manrope.style.fontFamily,
    fontSize: '1.125rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  }

  theme.typography.subtitle1 = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
    color: theme.palette.text.primary,
  }

  theme.typography.subtitle2 = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem',
    },
  }

  theme.typography.body1 = {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
    color: theme.palette.neutral.dark,
  }

  theme.typography.body2 = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '0.875rem',
    fontWeight: 400,
    color: theme.palette.neutral.dark,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  }

  theme.typography.caption = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme.palette.text.primary,
    lineHeight: 1.6,
    letterSpacing: '0.03333em',
  }

  theme.typography.overline = {
    fontFamily: poppins.style.fontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.26,
    letterSpacing: '0.08333em',
    color: theme.palette.text.primary,
  }

  //* adding default shadow use elevation={25} for paper or in sx={{boxShadow:25}} to apply the following shadow property
  theme.shadows.push('0px 4px 20px rgba(0, 0, 0, 0.05)') // 25
  theme.shadows.push('0px 2px 20px rgba(0, 0, 0, 0.1)') // 26
  theme.shadows.push('0px 4px 8px -4px rgba(20, 21, 33, 0.42)') // 27

  return theme
}

export const getTheme = (mode: PaletteMode): Theme => {
  if (mode !== 'dark') {
    let theme = createTheme({
      palette: {
        mode: 'light',
        text: {
          primary: '#02060d',
          //* In future please modify this color by taking necessary precaution,
          //* LIke this will be the unchecked color of checkbox
          secondary: grey[100],
          disabled: grey[500],
        },
        primary: {
          main: blue[500], // 500
          dark: blue[900], // 900
          light: blue[400], // 400,
        },
        secondary: {
          main: orange[500], // 500
          dark: orange[900], // 900
          light: orange[400], // 400
        },
        neutral: {
          main: grey[600],
          dark: grey[900],
          light: grey[500],
        },
      },
    })

    theme = responsiveFontSizes(theme)
    setCommonStyles(theme)
    return theme
  } else {
    let darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#2467EC', // 500
          dark: '#0F2B63', // 900
          light: '#5085F0', // 400,
        },
        secondary: {
          main: '#FEAF13', // 500
          dark: '#e79f11', // 900
          light: '#febf42', // 400
        },
        neutral: {
          main: grey[300],
          dark: grey[400],
          light: grey[200],
        },
      },
    })
    darkTheme = responsiveFontSizes(darkTheme)
    setCommonStyles(darkTheme)
    return darkTheme
  }
}
