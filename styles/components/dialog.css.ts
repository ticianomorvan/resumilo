import { keyframes, style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const showOverlay = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const showDialog = keyframes({
  '0%': {
    opacity: 0,
    top: '60%',
  },
  '100%': {
    opacity: 1,
    top: '50%',
  },
});

export const invoker = style({
  backgroundColor: vars.color['error-dark'],
  border: 'none',
  color: 'white',
  width: vars.size.full,
  height: vars.size.full,
  borderBottomLeftRadius: vars.rounded.sm,
  borderBottomRightRadius: vars.rounded.sm,
  ':hover': {
    filter: 'brightness(1.10)',
  },
  ':focus-visible': {
    outline: 'none',
  },
});

export const overlay = style({
  position: 'fixed',
  inset: '0px',
  zIndex: 120,
  backgroundColor: '#0006',
  backdropFilter: 'blur(5px)',
  animation: `${showOverlay} 0.25s`,
});

export const dialog = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 130,
  translate: '-50% -50%',
  padding: vars.spacing.lg,
  borderRadius: vars.rounded.md,
  backgroundColor: 'white',
  animation: `${showDialog} 0.25s`,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm,
});
