import { DocumentHead, Link } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <main class="mx-4 flex flex-col justify-center items-center">
      <h1>Un hogar para tus resúmenes</h1>
      <p>Resumilo te permite compartir todos tus apuntes, escritos y notas sobre los tópicos que más te gustan.</p>
      <Link href="/summaries">
        <button type="button">Resúmenes</button>
      </Link>
    </main>
  )
});

export const head: DocumentHead = {
  title: 'Resumilo',
};
