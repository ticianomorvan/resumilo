import { keyframes, style, styleVariants } from "@vanilla-extract/css"
import { vars } from "./theme.css"

export const badge = style({
  color: vars.color["primary-700"],
  backgroundColor: vars.color["primary-100"],
  padding: vars.spacing.xs,
  borderRadius: vars.rounded.lg
})

// Search

export const search = {
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.sm,
    maxWidth: "33%"
  }),
  input: style({
    borderRadius: vars.rounded.md,
    borderWidth: '1px',
    borderColor: 'black',
    padding: vars.spacing.sm,
    ":focus-visible": {
      outlineColor: vars.color["primary-500"]
    }
  })
}