import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const badge = style({
  color: vars.colors.primary.semitone,
  backgroundColor: vars.colors.primary.light,
  padding: vars.spacing.sm,
  borderRadius: vars.rounded.lg,
});

export default badge;
