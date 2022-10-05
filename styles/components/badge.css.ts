import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

export const badge = style({
  color: vars.color["primary-700"],
  backgroundColor: vars.color["primary-100"],
  padding: vars.spacing.sm,
  borderRadius: vars.rounded.lg
})