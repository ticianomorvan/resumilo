import { style } from '@vanilla-extract/css';
import vars from 'styles/theme.css';

// /resumenes/

export const summariesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: vars.size['2xl'],
  margin: 'auto',
  marginBlockEnd: vars.spacing.md,
  gap: vars.spacing.sm,
  paddingInline: vars.spacing.md,
  '@media': {
    'screen and (min-width: 425px)': {
      maxWidth: vars.size.xl,
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
