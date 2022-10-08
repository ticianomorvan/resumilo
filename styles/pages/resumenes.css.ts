import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

// /resumenes/

export const title = style({
  textAlign: 'center',
});

export const summariesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  paddingInline: vars.spacing.md,
  '@media': {
    'screen and (min-width: 425px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: vars.spacing.sm,
      alignItems: 'stretch',
    },
  },
});

// /resumenes/[id]

export const downloadButton = style({
  display: 'flex',
  gap: vars.spacing.sm,
  alignItems: 'center',
});
