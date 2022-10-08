import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

const container = style({
  width: vars.size.screen.width,
  height: vars.size.screen.height,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media': {
    'screen and (min-width: 768px)': {
      justifyContent: 'center',
    },
  },
});

export default container;
