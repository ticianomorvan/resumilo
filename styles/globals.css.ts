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

// NProgress customization

globalStyle('#nprogress', {
  pointerEvents: "none"
})

globalStyle('#nprogress .bar', {
  background: vars.color["primary-500"],
  position: "fixed",
  zIndex: 1031,
  top: 0,
  left: 0,
  width: vars.size.full,
  height: "2px"
})