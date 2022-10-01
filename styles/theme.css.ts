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
    info: '#41A0F2'
  },
  spacing: {
    xs: '0.25em',
    sm: '0.75em',
    md: '1.5em',
    lg: '2em',
    xl: '4em'
  },
  rounded: {
    sm: '0.5em',
    md: '0.75em',
    lg: '1.25em',
    xl: '2em',
    full: '9999px'
  },
  fontFamily: `'Jost', system-ui, sans-serif`,
  text: {
    'xs': '0.5em',
    'sm': '1em',
    'md': '1.5em',
    'lg': '2.25em',
    'xl': '3em'
  }
})