import { component$ } from "@builder.io/qwik";
import styles from "./navbar.module.css"

export default component$(() => {
  return (
    <header className={styles.container}>
      <nav>
        <p className={styles.name}>Resumilo</p>
      </nav>
    </header>
  )
})