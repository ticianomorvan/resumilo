import { component$ } from "@builder.io/qwik";
import styles from "~/styles/components/navbar.module.css"

export const Navbar = component$(() => {
  return (
    <header className={styles.container}>
      <nav>
        <p className={styles.name}>Resumilo</p>
      </nav>
    </header>
  )
})