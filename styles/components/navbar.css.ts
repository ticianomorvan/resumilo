import { keyframes, style } from '@vanilla-extract/css';
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

export const actions = style({
  display: 'flex',
  gap: vars.spacing.sm,
});

const showDropdown = keyframes({
  '0%': {
    opacity: 0,
    top: '-20px',
  },
  '100%': {
    opacity: 1,
    top: '0',
  },
});

export const dropdown = {
  trigger: style({
    display: 'flex',
    fontSize: vars.text.md,
    alignItems: 'center',
    gap: vars.spacing.xs,
    ':hover': {
      cursor: 'pointer',
    },
  }),
  caret: style({
    fontSize: vars.text.xs,
  }),
  content: style({
    backgroundColor: vars.color['primary-900'],
    padding: vars.spacing.md,
    zIndex: 140,
    position: 'fixed',
    translate: '-50%',
    display: 'flex',
    borderBottomLeftRadius: vars.rounded.md,
    borderBottomRightRadius: vars.rounded.md,
    flexDirection: 'column',
    gap: vars.spacing.sm,
    width: 'max-content',
    animation: `${showDropdown} 0.25s`,
  }),
  item: style({
    ':focus-visible': {
      border: 'none',
      outline: 'none',
    },
  }),
  itemSpan: style({
    display: 'flex',
    gap: vars.spacing.sm,
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    transition: 'translate 0.25s',
    ':hover': {
      translate: '5px',
      cursor: 'pointer',
    },
  }),
};
