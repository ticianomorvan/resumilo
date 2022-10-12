import { keyframes, style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const icon = style({
  fontSize: vars.text.md, // react-icons size is defined by font size.
});

const flash = keyframes({
  '0%': {
    backgroundColor: vars.colors.primary.darker,
    boxShadow: `32px 0 ${vars.colors.primary.darker}, -32px 0 ${vars.colors.primary.principal}`,
  },
  '50%': {
    backgroundColor: vars.colors.primary.principal,
    boxShadow: `32px 0 ${vars.colors.primary.darker}, -32px 0 ${vars.colors.primary.darker}`,
  },
  '100%': {
    backgroundColor: vars.colors.primary.darker,
    boxShadow: `32px 0 ${vars.colors.primary.principal}, -32px 0 ${vars.colors.primary.darker}`,
  },
});

export const loaderBackground = style({
  backgroundColor: vars.colors.primary.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: vars.size.screen.height,
});

export const loader = style({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: vars.colors.primary.principal,
  boxShadow: '32px 0 #fff, -32px 0 #fff',
  position: 'relative',
  animation: `${flash} 0.5s ease-out infinite alternate`,
});
