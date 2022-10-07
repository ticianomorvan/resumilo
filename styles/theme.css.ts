import { createGlobalTheme } from "@vanilla-extract/css"

export const vars = createGlobalTheme('html', {
  color: {
    'primary-100': '#E3FFE5',
    'primary-200': '#BDF4C1',
    'primary-300': '#97E89E',
    'primary-400': '#72DD7A',
    'primary-500': '#4CD156',
    'primary-600': '#26C633',
    'primary-700': '#00BA0F',
    "error-dark": '#E91A1A',
    "error-light": "#FFB7B7",
    warning: '#F1D442',
    info: '#41A0F2',
    "gray-50": "#0042",
    "gray-100": '#0045',
    "gray-200": "#004a",
    "gray-300": '#002e'
  },
  spacing: {
    xs: '0.25em',
    sm: '0.75em',
    md: '1.5em',
    lg: '2em',
    xl: '6em',
    xxl: '8em'
  },
  rounded: {
    sm: '0.5em',
    md: '0.75em',
    lg: '1.25em',
    xl: '2em',
    half: "50%",
    full: '9999px'
  },
  fontFamily: `'Inter', system-ui, sans-serif`,
  text: {
    xs: '0.85em',
    sm: '1em',
    md: '1.5em',
    lg: '2.25em',
    xl: '3em'
  },
  size: {
    xs: '10%',
    sm: '25%',
    md: '45%',
    lg: '60%',
    xl: '80%',
    full: '100%',
    screen: {
      width: '100vw',
      height: '100vh'
    }
  }
})