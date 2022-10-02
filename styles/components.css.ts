import { keyframes, style, styleVariants } from "@vanilla-extract/css"
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
  cursor: "pointer",
  "@media": {
    "screen and (min-width: 768px)": {
      fontSize: vars.text.sm,
    }
  }
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

const errorShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.85)'
  },
  '100%': {
    opacity: 100,
    transform: 'scale(1)'
  }
})

export const creationInputStyles = {
  container: style({ marginBlock: vars.spacing.md }),
  label: style({
    fontSize: vars.text.sm,
    color: vars.color["gray-300"],
    paddingBlock: vars.spacing.xs,
    marginBlock: 0,
    "@media": {
      [`screen and (min-width: 768px)`]: {
        fontSize: vars.text.md,
      }
    }
  }),
  input: style({
    width: '100%',
    padding: vars.spacing.xs,
    borderColor: vars.color["gray-100"],
    borderWidth: '1px',
    ":focus-visible": {
      outlineColor: vars.color["primary-500"]
    },
    fontFamily: vars.fontFamily,
    fontSize: vars.text.xs,
    "@media": {
      [`screen and (min-width: 768px)`]: {
        fontSize: vars.text.sm,
      }
    }
  }),
  error: style({
    backgroundColor: vars.color["error-light"],
    padding: vars.spacing.sm,
    borderRadius: vars.rounded.sm,
    color: vars.color["error-dark"],
    animationName: errorShow,
    animationDuration: '0.5s'
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