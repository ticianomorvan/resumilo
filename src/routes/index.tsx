import { DocumentHead, Link } from '@builder.io/qwik-city';
import { component$, useStyles$ } from '@builder.io/qwik';
import styles from "~/styles/index.css"

export default component$(() => {
  useStyles$(styles);

  return (
    <main>
      <h1>Un hogar para tus resúmenes</h1>
      <p>Resumilo te permite compartir todos tus apuntes, escritos y notas sobre los tópicos que más te gustan.</p>
      <Link href="/summaries">Resúmenes</Link>
    </main>
  )
});

export const head: DocumentHead = {
  title: 'Resumilo',
};
