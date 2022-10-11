import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  width: vars.size.full,
  maxHeight: vars.size.screen.height,
  marginBlock: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  userSelect: 'none',
});

export const content = style({
  minWidth: vars.size.lg,
});
