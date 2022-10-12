import { createGlobalTheme } from '@vanilla-extract/css';
import {
  red, blue, yellow, gray,
} from '@radix-ui/colors';

const vars = createGlobalTheme('html', {
  colors: {
    primary: {
      light: '#9DCEE2',
      principal: '#4091C9',
      semitone: '#1368AA',
      darker: '#033270',
    },
    warning: {
      light: '#F29479',
      lighter: '#F26A4F',
      principal: '#EF3C2D',
      darker: '#CB1B16',
      dark: '#65010C',
    },
    ...red,
    ...blue,
    ...yellow,
    ...gray,
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
