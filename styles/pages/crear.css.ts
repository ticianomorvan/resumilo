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
});
