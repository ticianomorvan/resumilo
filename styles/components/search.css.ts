import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

export const search = {
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.sm,
    maxWidth: "33%"
  }),
  input: style({
    borderRadius: vars.rounded.md,
    borderWidth: '1px',
    borderColor: 'black',
    padding: vars.spacing.sm,
    ":focus-visible": {
      outlineColor: vars.color["primary-500"]
    }
  })
}