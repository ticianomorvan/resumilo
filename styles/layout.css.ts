import { style } from "@vanilla-extract/css"

export const container = style({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
})