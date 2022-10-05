import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  width: vars.size.lg,
  height: vars.size.screen.height,
  justifyContent: 'center',
  alignItems: 'center',
})

export const primaryCta = style({
  width: vars.size.full
})