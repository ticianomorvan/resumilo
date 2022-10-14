import { globalStyle } from '@vanilla-extract/css';
import vars from './theme.css';

globalStyle(
  'h1, h2, h3, h4, p, input, div, span, section, nav',
  {
    fontFamily: vars.fontFamily,
  },
);

globalStyle('html', {
  backgroundColor: vars.colors.gray3,
});

globalStyle('h1, h2, h3, h4', {
  textAlign: 'center',
});

globalStyle('h1', {
  fontSize: vars.text.xl,
  padding: vars.spacing.xs,
});

globalStyle('h2', {
  fontSize: vars.text.lg,
  fontWeight: 'normal',
});

globalStyle('input[type="file"]', {
  display: 'flex',
});

// NProgress customization

globalStyle('#nprogress', {
  pointerEvents: 'none',
});

globalStyle('#nprogress .bar', {
  background: vars.colors.primary.light,
  position: 'fixed',
  zIndex: 1031,
  top: 0,
  left: 0,
  width: vars.size.full,
  height: '2px',
});
