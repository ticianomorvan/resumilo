import Pocketbase from "pocketbase"
import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { convertToSummary } from "~/lib/utils";
import { Summary } from "~/types/summary";
import { SummaryCard } from "~/components/summary_card";

export const onGet: RequestHandler<Summary[]> = async () => {
  const client = new Pocketbase(import.meta.env.VITE_POCKETBASE)

  const records = await client.records.getFullList('summaries', 200, {
    sort: '-created'
  })

  const data = records.map((record) => convertToSummary(record))

  return data
};

export default component$(() => {
  const summaries = useEndpoint<Summary[]>()

  return (
    <Resource
      value={summaries}
      onResolved={(summaries) => (
        <>
          {summaries.map((summary) => (
            <SummaryCard
              data={summary}
            />
          ))}
        </>
      )}
    />
  )
})