import { style } from "@vanilla-extract/css"

export const container = style({
  width: '100vw',
  marginBlock: '10em',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  userSelect: 'none',
})