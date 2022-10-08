import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  width: vars.size.full,
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

export const fileUpload = {
  container: style({
    marginBlock: vars.spacing.sm,
    marginBlockEnd: vars.spacing.sm,
  }),
  label: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0 1em',
    fontSize: vars.text.sm,
    color: vars.color['gray-300'],
    '@media': {
      'screen and (min-width: 768px)': {
        fontSize: vars.text.sm,
      },
    },
  }),
  input: style({
    width: '100%',
    marginBlockEnd: vars.spacing.sm,
    backgroundColor: vars.color['primary-500'],
    border: 'none',
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    transition: 'all 0.25s',
    ':hover': {
      backgroundColor: vars.color['primary-400'],
      cursor: 'pointer',
    },
  }),
  footnote: style({
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    fontSize: vars.text.xs,
    color: vars.color['gray-200'],
    backgroundColor: vars.color['gray-50'],
    '@media': {
      'screen and (min-width: 768px)': {
        fontSize: vars.text.sm,
      },
    },
  }),
};

export const uploadMessage = style({
  marginBlockStart: vars.spacing.lg,
  fontSize: vars.text.md,
  textAlign: 'center',
  color: vars.color['gray-300'],
});

export const uploadButton = style({
  width: '100%',
});
