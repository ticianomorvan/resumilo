import { keyframes, style } from "@vanilla-extract/css"
import { vars } from "styles/theme.css"

const errorShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.85)'
  },
  '100%': {
    opacity: 100,
    transform: 'scale(1)'
  }
})

export const creationInputStyles = {
  container: style({ marginBlock: vars.spacing.md }),
  label: style({
    fontSize: vars.text.sm,
    color: vars.color["gray-300"],
    paddingBlock: vars.spacing.xs,
    marginBlock: 0,
    "@media": {
      [`screen and (min-width: 768px)`]: {
        fontSize: vars.text.md,
      }
    }
  }),
  input: style({
    width: '100%',
    padding: vars.spacing.xs,
    borderColor: vars.color["gray-100"],
    borderWidth: '1px',
    ":focus-visible": {
      outlineColor: vars.color["primary-500"]
    },
    fontFamily: vars.fontFamily,
    fontSize: vars.text.xs,
    "@media": {
      [`screen and (min-width: 768px)`]: {
        fontSize: vars.text.sm,
      }
    }
  }),
  error: style({
    backgroundColor: vars.color["error-light"],
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    color: vars.color["error-dark"],
    animationName: errorShow,
    animationDuration: '0.5s'
  })
}