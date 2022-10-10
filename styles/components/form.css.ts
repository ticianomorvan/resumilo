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
  color: vars.color['gray-300'],
});

export const signUpMessage = style({
  textAlign: 'center',
  padding: vars.spacing.sm,
  background: vars.color['primary-100'],
  color: vars.color['primary-600'],
  transition: 'all 0.15s',
  borderRadius: vars.rounded.sm,
  ':hover': {
    background: vars.color['primary-600'],
    color: '#FFF',
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

export const dropzone = style({
  padding: vars.spacing.md,
  marginBlock: vars.spacing.sm,
  background: vars.color['primary-100'],
  borderRadius: vars.rounded.md,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  textAlign: 'center',
  cursor: 'pointer',
  color: vars.color['gray-300'],
  border: `2px dashed ${vars.color['gray-50']}`,
  transition: 'all 0.5s',
  ':focus': {
    borderColor: vars.color['primary-500'],
  },
});

export const footNote = style({
  display: 'flex',
  gap: vars.spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.color['gray-50'],
  padding: vars.spacing.sm,
  marginBlockStart: vars.spacing.sm,
  marginBlockEnd: vars.spacing.sm,
  borderRadius: vars.rounded.md,
  color: vars.color['gray-300'],
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
  border: `1px solid ${vars.color['gray-200']}`,
});

export const uploadMessage = style({
  marginBlockStart: vars.spacing.lg,
  marginBlockEnd: vars.spacing.xs,
  fontSize: vars.text.md,
  textAlign: 'center',
  color: vars.color['gray-300'],
});

export const uploadButton = style({
  width: '100%',
});
