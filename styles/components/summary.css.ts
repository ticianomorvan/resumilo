import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

export const container = style({
  display: "flex",
  backgroundColor: vars.color["primary-500"],
  padding: vars.spacing.md,
  alignItems: "center",
  justifyContent: "space-around",
  borderRadius: vars.rounded.md,
  transition: "all 0.25s",
  ":hover": {
    backgroundColor: vars.color["primary-600"],
    cursor: "pointer",
    scale: "1.05",
  }
})

export const information = style({
  textAlign: "center"
})

export const title = style({
  fontSize: vars.text.md,
  fontWeight: "bold"
})

export const date = style({
  color: vars.color["gray-300"],
})