import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  display: 'flex',
  border: 'none',
  flex: 1,
  flexDirection: 'column',
  fontFamily: vars.fontFamily,
  backgroundColor: vars.colors.primary.principal,
  padding: vars.spacing.md,
  gap: vars.spacing.lg,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: vars.rounded.md,
  transition: 'all 0.25s',
  ':hover': {
    backgroundColor: vars.colors.primary.semitone,
    cursor: 'pointer',
    translate: '0 -5px',
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
  color: vars.colors.gray2,
  fontSize: vars.text.md,
  fontWeight: 'bold',
});

export const date = style({
  color: vars.colors.gray3,
});
