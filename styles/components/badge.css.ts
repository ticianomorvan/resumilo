import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const badge = style({
  color: vars.color['primary-700'],
  backgroundColor: vars.color['primary-100'],
  padding: vars.spacing.sm,
  borderRadius: vars.rounded.lg,
});

export default badge;
