import { style } from "@vanilla-extract/css"
import { vars } from "./theme.css"

export const container = style({
  width: vars.size.screen.width,
  minHeight: vars.size.screen.height,
  marginBlock: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  userSelect: 'none',
})