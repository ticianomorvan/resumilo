import vars from 'styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

// Alert Dialog

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

export const action = style({
  backgroundColor: vars.color['error-dark'],
  border: 'none',
  color: 'white',
  width: vars.size.full,
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

// Popover

export const trigger = style({
  border: 'none',
  background: 'none',
});

const appearing = keyframes({
  '0%': {
    translate: '0px 5px',
    opacity: 0,
  },
  '100%': {
    translate: '0',
    opacity: 100,
  },
});

export const content = style({
  backgroundColor: 'white',
  borderRadius: vars.rounded.sm,
  zIndex: 110,
  position: 'relative',
  top: 20,
  width: '200px',
  boxShadow: '1px 2px 5px #000a',
  animation: `${appearing} ease-out 0.25s`,
});

export const item = style({
  margin: 0,
  padding: vars.spacing.sm,
  width: vars.size.full,
  transition: 'all 0.25s',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: vars.color['primary-100'],
  },
});
