import { DocumentHead, Link } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import styles from "~/styles/index.module.css"

export default component$(() => {
  return (
    <main className={styles.container}>
      <h1>Un hogar para tus resúmenes</h1>
      <p>Resumilo te permite compartir todos tus apuntes, escritos y notas sobre los tópicos que más te gustan.</p>
      <Link href="/summaries">Resúmenes</Link>
    </main>
  )
});

export const head: DocumentHead = {
  title: 'Resumilo',
};
