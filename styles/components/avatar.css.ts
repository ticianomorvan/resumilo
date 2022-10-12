import vars from 'styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const image = style({
  borderRadius: vars.rounded.full,
  objectFit: 'cover',
});

export const fallback = style({
  border: '1px solid #000',
  padding: vars.spacing.md,
  borderRadius: vars.rounded.full,
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
  right: 10,
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
    backgroundColor: vars.colors.primary.light,
  },
});
