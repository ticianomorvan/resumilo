import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

export const container = style({
  display: "flex",
  backgroundColor: vars.color["primary-500"],
  padding: vars.spacing.sm
})