import { keyframes, style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const errorShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.85)',
  },
  '100%': {
    opacity: 100,
    transform: 'scale(1)',
  },
});

export const container = style({
  marginBlock: vars.spacing.md,
  width: vars.size.full,
});

export const label = style({
  fontSize: vars.text.sm,
  color: vars.color['gray-300'],
  paddingBlock: vars.spacing.xs,
  marginBlock: 0,
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: vars.text.sm,
    },
  },
});

export const input = style({
  width: vars.size.full,
  padding: vars.spacing.xs,
  borderColor: vars.color['gray-100'],
  borderWidth: '1px',
  ':focus-visible': {
    outlineColor: vars.color['primary-500'],
  },
  fontFamily: vars.fontFamily,
  fontSize: vars.text.xs,
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: vars.text.sm,
    },
  },
});

export const error = style({
  backgroundColor: vars.color['error-light'],
  padding: vars.spacing.sm,
  borderRadius: vars.rounded.sm,
  color: vars.color['error-dark'],
  animationName: errorShow,
  animationDuration: '0.5s',
});

export const passwordInput = style({
  display: 'flex',
  gap: vars.spacing.xs,
});

export const showPassword = style({
  border: 'none',
  background: vars.color['primary-200'],
  padding: vars.spacing.sm,
  fontSize: vars.text.sm,
  transition: 'all 0.15s',
  ':hover': {
    cursor: 'pointer',
    background: vars.color['primary-300'],
  },
});
