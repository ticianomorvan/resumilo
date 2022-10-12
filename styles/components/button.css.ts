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
    backgroundColor: vars.colors.primary.principal,
    color: '#EEE',
    ':hover': {
      backgroundColor: vars.colors.primary.semitone,
    },
  }],
  ghost: [button, {
    backgroundColor: vars.colors.primary.light,
    color: vars.colors.primary.darker,
    ':hover': {
      backgroundColor: vars.colors.primary.semitone,
    },
  }],
  caution: [button, {
    backgroundColor: vars.colors.warning.principal,
    color: '#EEE',
    ':hover': {
      filter: 'brightness(0.85)',
    },
  }],
});

export default buttonVariants;
