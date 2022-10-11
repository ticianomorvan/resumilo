import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const dropzone = style({
  padding: vars.spacing.md,
  marginBlock: vars.spacing.sm,
  background: vars.color['primary-100'],
  borderRadius: vars.rounded.md,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  color: vars.color['gray-300'],
  border: `2px dashed ${vars.color['primary-700']}`,
  transition: 'all 0.5s',
  ':focus': {
    borderColor: vars.color['primary-500'],
  },
  ':hover': {
    backgroundColor: vars.color['primary-200'],
  },
});

export const footNote = style({
  display: 'flex',
  gap: vars.spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid ${vars.color['primary-600']}`,
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
