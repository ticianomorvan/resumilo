import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  width: vars.size.full,
  margin: 'auto',
  padding: vars.spacing.sm,
  '@media': {
    'screen and (min-width: 768px)': {
      width: vars.size.xl,
      padding: 0,
    },
    'screen and (min-width: 1024px)': {
      width: vars.size.half.width,
    },
  },
});

export const header = style({
  textAlign: 'center',
  color: vars.colors.gray12,
});

export const signUpMessage = style({
  textAlign: 'center',
  padding: vars.spacing.sm,
  textDecoration: 'underline',
  color: vars.colors.primary.semitone,
  transition: 'all 0.15s',
  borderRadius: vars.rounded.sm,
  ':hover': {
    color: vars.colors.primary.darker,
    cursor: 'pointer',
  },
});

export const formContainer = style({
  width: '90%',
  paddingInline: vars.spacing.md,
  borderWidth: '2px',
  borderColor: 'black',
  borderRadius: vars.rounded.lg,
});

export const uploadMessage = style({
  marginBlockStart: vars.spacing.lg,
  marginBlockEnd: vars.spacing.xs,
  fontSize: vars.text.md,
  textAlign: 'center',
  color: vars.colors.gray12,
});

export const uploadButton = style({
  width: '100%',
});

export const agreement = style({
  display: 'flex',
  backgroundColor: vars.colors.warning.lighter,
  padding: vars.spacing.md,
  gap: vars.spacing.sm,
  justifyContent: 'space-around',
  marginBlock: vars.spacing.md,
});
