import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  display: 'flex',
  border: 'none',
  flex: 1,
  flexDirection: 'column',
  fontFamily: vars.fontFamily,
  backgroundColor: vars.color['primary-500'],
  padding: vars.spacing.md,
  gap: vars.spacing.lg,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: vars.rounded.md,
  transition: 'all 0.25s',
  ':hover': {
    backgroundColor: vars.color['primary-600'],
    cursor: 'pointer',
    scale: '1.05',
  },
  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
});

export const information = style({
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.text.md,
  fontWeight: 'bold',
});

export const date = style({
  color: vars.color['gray-300'],
});
