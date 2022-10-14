import vars from 'styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: vars.size.xl,
  margin: 'auto',
});

export const searchContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBlockEnd: vars.spacing.md,
});

export const inputContainer = style({
  display: 'flex',
  width: vars.size.full,
  boxShadow: `0 0 10px ${vars.colors.gray6}`,
  borderRadius: vars.rounded.xl,
});

export const input = style({
  border: 'none',
  outline: 'none',
  width: vars.size.full,
  padding: vars.spacing.md,
  fontSize: vars.text.sm,
  borderTopLeftRadius: vars.rounded.xl,
  borderBottomLeftRadius: vars.rounded.xl,
});

export const button = style({
  border: 'none',
  outline: 'none',
  borderTopRightRadius: vars.rounded.xl,
  borderBottomRightRadius: vars.rounded.xl,
  padding: vars.spacing.md,
  backgroundColor: '#fff',
  ':hover': {
    cursor: 'pointer',
  },
});

export const note = style({
  display: 'flex',
  alignItems: 'center',
  color: vars.colors.gray11,
  marginBlock: vars.spacing.sm,
  gap: vars.spacing.sm,
});

export const results = style({
  display: 'grid',
  gap: vars.spacing.sm,
  gridTemplateColumns: '1, 1fr',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});
