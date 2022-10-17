import Pocketbase from "pocketbase"
import { component$, Resource, useStyles$ } from "@builder.io/qwik";
import { DocumentHead, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Summary } from "~/types/summary";
import { convertToSummary } from "~/lib/utils";
import { SummaryCard } from "~/components/summary_card";
import styles from "~/styles/summaries.css"

export const onGet: RequestHandler<Summary[]> = async () => {
  const client = new Pocketbase(import.meta.env.VITE_POCKETBASE)

  const records = await client.records.getFullList('summaries', 200)

  const data = records.map((record) => convertToSummary(record))

  return data
};

export default component$(() => {
  const data = useEndpoint<Summary[]>()
  useStyles$(styles)

  return (
    <Resource
      value={data}
      onPending={() => <p>Cargando...</p>}
      onRejected={() => <p>Hubo un error.</p>}
      onResolved={(summaries) => (
        <>
          <h1>Mirá los últimos resúmenes.</h1>
          <section>
            {summaries.map((summary) => <SummaryCard data={summary} />)}
          </section>
        </>
      )}
    />
  )
})

export const head: DocumentHead = {
  title: 'Resúmenes | Resumilo'
}