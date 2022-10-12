import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const dropzone = style({
  padding: vars.spacing.md,
  marginBlock: vars.spacing.sm,
  background: vars.colors.primary.light,
  borderRadius: vars.rounded.md,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  color: vars.colors.gray12,
  border: `2px dashed ${vars.colors.primary.darker}`,
  transition: 'all 0.5s',
  ':focus': {
    borderColor: vars.colors.primary.principal,
  },
  ':hover': {
    backgroundColor: vars.colors.primary.principal,
  },
});

export const footNote = style({
  display: 'flex',
  gap: vars.spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid ${vars.colors.primary.principal}`,
  padding: vars.spacing.sm,
  marginBlockStart: vars.spacing.sm,
  marginBlockEnd: vars.spacing.sm,
  borderRadius: vars.rounded.md,
  color: vars.colors.gray12,
  fontSize: vars.text.xs,
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: vars.text.sm,
    },
  },
});

export const thumb = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBlockEnd: vars.spacing.lg,
  textAlign: 'center',
});

export const thumbInner = style({
  maxWidth: 'max-content',
  margin: 'auto',
  padding: vars.spacing.xs,
  border: `1px solid ${vars.colors.gray2}`,
});
