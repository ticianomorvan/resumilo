import { style } from "@vanilla-extract/css"

export const container = style({
  width: '100vw',
  marginBlock: '6em',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
})