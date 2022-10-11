import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

export const container = style({
  top: 0,
  width: '100%',
  position: 'fixed',
  display: 'flex',
  zIndex: 100,
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '2px 2px 20px #0002',
  paddingInline: vars.spacing.md,
  backdropFilter: 'blur(20px)',
});

export const name = style({
  fontSize: vars.text.md,
});

export const actions = style({
  display: 'flex',
  gap: vars.spacing.sm,
});
