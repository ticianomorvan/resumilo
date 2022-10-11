import { style, styleVariants } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const button = style({
  padding: vars.spacing.sm,
  fontFamily: vars.fontFamily,
  fontWeight: 'bold',
  marginInline: vars.spacing.xs,
  marginBlock: vars.spacing.sm,
  borderRadius: vars.rounded.md,
  border: 'none',
  transitionDuration: '0.25s',
  cursor: 'pointer',
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: vars.text.sm,
    },
  },
});

export const full = style({ width: vars.size.full });

const buttonVariants = styleVariants({
  primary: [button, {
    backgroundColor: vars.color['primary-600'],
    color: '#EEE',
    ':hover': {
      backgroundColor: vars.color['primary-500'],
    },
  }],
  ghost: [button, {
    backgroundColor: vars.color['primary-200'],
    color: vars.color['primary-700'],
    ':hover': {
      backgroundColor: vars.color['primary-300'],
    },
  }],
  caution: [button, {
    backgroundColor: vars.color['error-dark'],
    color: '#EEE',
    ':hover': {
      filter: 'brightness(0.85)',
    },
  }],
});

export default buttonVariants;
