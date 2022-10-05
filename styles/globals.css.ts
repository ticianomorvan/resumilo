import { globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle('html', {
  fontFamily: vars.fontFamily
})

globalStyle('h1', {
  fontSize: vars.text.xl,
})

globalStyle('h2', {
  fontSize: vars.text.lg,
  fontWeight: 'normal'
})

globalStyle('input[type="file"]', {
  display: "flex",
})