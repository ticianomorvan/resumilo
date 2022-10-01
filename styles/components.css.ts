import { style, styleVariants } from "@vanilla-extract/css"
import { vars } from "./theme.css"

// Navigation Bar

export const navbar = {
  container: style({
    top: 0,
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '2px 2px 20px #0002',
    paddingInline: vars.spacing.md,
  }),
  name: style({
    fontSize: vars.text.md
  })
}



// Button

const button = style({
  padding: vars.spacing.sm,
  fontFamily: vars.fontFamily,
  fontWeight: 'bold',
  marginInline: vars.spacing.xs,
  borderRadius: vars.rounded.md,
  border: 'none',
  transitionDuration: '0.25s',
  cursor: "pointer"
})

export const buttonVariants = styleVariants({
  primary: [button, {
    backgroundColor: vars.color["primary-700"],
    color: '#EEE',
    ":hover": {
      backgroundColor: vars.color["primary-500"]
    }
  }],
  ghost: [button, {
    backgroundColor: vars.color["primary-200"],
    color: vars.color["primary-700"],
    ":hover": {
      backgroundColor: vars.color["primary-300"]
    }
  }],
  caution: [button, {
    backgroundColor: vars.color["error-dark"],
    color: '#EEE',
    ":hover": {
      filter: 'brightness(0.85)'
    }
  }]
})

// Badge

export const badge = style({
  color: vars.color["primary-700"],
  backgroundColor: vars.color["primary-100"],
  padding: vars.spacing.xs,
  borderRadius: vars.rounded.lg
})

// Input Field

export const inputField = {
  container: style({ marginBlock: vars.spacing.md }),
  label: style({ fontSize: vars.text.md, paddingBlock: vars.spacing.md }),
  input: style({
    width: '100%',
    padding: vars.spacing.xs,
    borderRadius: vars.rounded.md,
    borderColor: 'black',
    borderWidth: '1px',
    ":focus-visible": {
      outlineColor: vars.color["primary-500"]
    }
  }),
  error: style({
    backgroundColor: vars.color["error-light"],
    color: vars.color["error-dark"]
  })
}

// Search

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