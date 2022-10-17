import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { Summary } from "~/types/summary";
import Pocketbase from "pocketbase"

interface Data {
  id: string,
  title: string,
  description: string,
  content: string,
}

export default component$(() => {
  const state = useStore<{ summaries: Data[] }>({
    summaries: []
  })

  useClientEffect$(() => {
    const client = new Pocketbase(import.meta.env.VITE_POCKETBASE)

    client.records.getFullList('summaries', 200)
      .then((records) => records.map((record) => {
        return {
          title: record.title,
          description: record.description,
          content: record.content,
          id: record.id
        }
      }))
      .then((summaries) => state.summaries = summaries)
  })

  return (
    <p>{state.summaries.map((summary) => summary.title)}</p>
  )
})