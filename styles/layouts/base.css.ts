import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const container = style({
  width: vars.size.screen.width,
  maxHeight: vars.size.screen.height,
  marginBlock: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  userSelect: 'none',
});

export default container;
