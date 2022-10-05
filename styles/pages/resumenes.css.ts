import { style } from "@vanilla-extract/css";
import { vars } from "styles/theme.css";

export const downloadButton = style({
  display: "flex",
  gap: vars.spacing.sm,
  alignItems: "center",
})