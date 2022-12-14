import { style } from '@vanilla-extract/css';
import vars from '../theme.css';

export const notLoggedIn = {
  container: style({
    width: '100vw',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  message: style({
    fontSize: vars.text.xl,
    fontWeight: 'bold',
  }),
  link: style({
    color: vars.color['primary-500'],
    textDecoration: 'underline',
  }),
};

export const container = style({
  display: 'grid',
  justifyItems: 'center',
  width: vars.size.full,
});

export const documentStatus = style({
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: vars.color['primary-200'],
  borderRadius: vars.rounded.md,
  padding: vars.spacing.sm,
  justifyContent: 'center',
  gap: vars.spacing.sm,
  alignItems: 'center',
});
