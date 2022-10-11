import { keyframes, style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const icon = style({
  fontSize: vars.text.md, // react-icons size is defined by font size.
});

const flash = keyframes({
  '0%': {
    backgroundColor: vars.color['primary-800'],
    boxShadow: `32px 0 ${vars.color['primary-800']}, -32px 0 ${vars.color['primary-500']}`,
  },
  '50%': {
    backgroundColor: vars.color['primary-500'],
    boxShadow: `32px 0 ${vars.color['primary-800']}, -32px 0 ${vars.color['primary-800']}`,
  },
  '100%': {
    backgroundColor: vars.color['primary-800'],
    boxShadow: `32px 0 ${vars.color['primary-500']}, -32px 0 ${vars.color['primary-800']}`,
  },
});

export const loaderBackground = style({
  backgroundColor: vars.color['primary-100'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: vars.size.screen.height,
});

export const loader = style({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: vars.color['primary-500'],
  boxShadow: '32px 0 #fff, -32px 0 #fff',
  position: 'relative',
  animation: `${flash} 0.5s ease-out infinite alternate`,
});
