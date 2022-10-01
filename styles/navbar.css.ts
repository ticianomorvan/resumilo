import { style } from "@vanilla-extract/css"
import { vars } from "./theme.css"

export const container = style({
  top: 0,
  width: '100%',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  boxShadow: '2px 2px 20px #0002',
  paddingInline: vars.spacing.md,
})

export const brandName = style({
  fontSize: vars.text.md
})