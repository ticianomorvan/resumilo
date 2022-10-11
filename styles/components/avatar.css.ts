import vars from 'styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

// Alert Dialog

export const action = style({
  backgroundColor: vars.color['error-dark'],
  border: 'none',
  color: 'white',
  width: vars.size.full,
  borderRadius: vars.rounded.sm,
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
  border: `2px solid ${vars.color['primary-800']}`,
  borderRadius: vars.rounded.sm,
  zIndex: 110,
  width: '200px',
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
