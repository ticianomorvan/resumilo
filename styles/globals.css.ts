import { globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle('html', {
  fontFamily: `'Jost', system-ui, sans-serif`
})

globalStyle('h1', {
  fontSize: vars.text.xl
})

globalStyle('h2', {
  fontSize: vars.text.lg,
  fontWeight: 'normal'
})