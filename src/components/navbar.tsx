import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "~/styles/components/navbar.css"

export default component$(() => {
  useStyles$(styles)

  return (
    <header>
      <nav>
        <p id="name">Resumilo</p>
      </nav>
    </header>
  )
})