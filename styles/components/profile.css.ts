import vars from 'styles/theme.css';
import { style } from '@vanilla-extract/css';

const profile = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBlock: vars.spacing.md,
});

export const username = style({
  marginBlock: vars.spacing.xs,
  textAlign: 'center',
});

export const additionalInformation = style({
  color: vars.color['gray-200'],
});

export default profile;
