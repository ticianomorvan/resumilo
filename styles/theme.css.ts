import { createGlobalTheme } from '@vanilla-extract/css';

const vars = createGlobalTheme('html', {
  color: {
    'primary-100': '#d1f0ff',
    'primary-200': '#a7e2ff',
    'primary-300': '#88d2f8',
    'primary-400': '#73c8f3',
    'primary-500': '#53b5e7',
    'primary-600': '#278bbf',
    'primary-700': '#146f9e',
    'primary-800': '#0a4b6c',
    'primary-900': '#042e44',
    'error-dark': '#E91A1A',
    'error-light': '#FFB7B7',
    warning: '#F1D442',
    info: '#41A0F2',
    'gray-50': '#0042',
    'gray-100': '#0045',
    'gray-200': '#004a',
    'gray-300': '#002e',
  },
  spacing: {
    xs: '0.25em',
    sm: '0.75em',
    md: '1.5em',
    lg: '2em',
    xl: '6em',
    xxl: '8em',
  },
  rounded: {
    sm: '0.5em',
    md: '0.75em',
    lg: '1.25em',
    xl: '2em',
    half: '50%',
    full: '9999px',
  },
  fontFamily: '\'Inter\', system-ui, sans-serif',
  text: {
    xs: '0.85em',
    sm: '1em',
    md: '1.5em',
    lg: '2.25em',
    xl: '3em',
  },
  size: {
    xs: '10%',
    sm: '25%',
    md: '45%',
    lg: '60%',
    xl: '80%',
    '2xl': '90%',
    half: {
      width: '50vw',
      height: '50vh',
    },
    full: '100%',
    screen: {
      width: '100vw',
      height: '100vh',
    },
  },
});

export default vars;
