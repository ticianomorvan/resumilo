import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const notLoggedIn = {
  container: style({
    width: "100vw",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
  }),
  message: style({
    fontSize: vars.text.xl,
    fontWeight: "bold"
  }),
  link: style({
    color: vars.color["primary-500"],
    textDecoration: "underline"
  })
}

export const container = style({
  display: "grid",
  justifyItems: "center",
  "@media": {
    [`screen and (min-width: 1024px)`]: {
      width: '60%',
      margin: "auto",
    },
  }
})

export const header = style({
  textAlign: "center",
  color: vars.color["gray-300"]
})

export const formContainer = style({
  width: '90%',
  paddingInline: vars.spacing.md,
  borderWidth: '2px',
  borderColor: 'black',
  borderRadius: vars.rounded.lg,
})

export const fileUpload = {
  container: style({
    marginBlock: vars.spacing.sm,
    marginBlockEnd: vars.spacing.xl
  }),
  label: style({
    display: "flex",
    flexDirection: "column",
    gap: "0 1em",
    fontSize: vars.text.sm,
    color: vars.color["gray-300"],
    "@media": {
      'screen and (min-width: 768px)': {
        fontSize: vars.text.md
      }
    }
  }),
  input: style({
    width: "100%",
    marginBlockEnd: vars.spacing.sm,
    backgroundColor: vars.color["primary-500"],
    border: "none",
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    transition: "all 0.25s",
    ":hover": {
      backgroundColor: vars.color["primary-400"],
      cursor: "pointer"
    }
  }),
  footnote: style({
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    fontSize: vars.text.xs,
    color: vars.color["gray-200"],
    backgroundColor: vars.color["gray-50"],
    "@media": {
      'screen and (min-width: 768px)': {
        fontSize: vars.text.sm
      }
    }
  })
}

export const uploadMessage = style({
  fontSize: vars.text.md,
  textAlign: "center",
  color: vars.color["gray-300"]
})

export const uploadButton = style({
  width: "100%"
})