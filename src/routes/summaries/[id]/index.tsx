import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { convertToSummary, getTimeFromCreation } from "~/lib/utils";
import { Summary } from "~/types/summary";
import Pocketbase from 'pocketbase'

export const onGet: RequestHandler<Summary> = async ({ params }) => {
  const { id } = params as { id: string }

  const client = new Pocketbase(import.meta.env.VITE_POCKETBASE)

  const record = await client.records.getOne('summaries', id)

  return convertToSummary(record)
};

export default component$(() => {
  const data = useEndpoint<Summary>()

  return (
    <Resource
      value={data}
      onResolved={(summary) => (
        <main class="flex flex-col items-center gap-6">
          {/* We use this conditional to break long non-spaced titles. */}
          <h1
            class={
              summary.title.split(' ').length === 1
                ? 'text-center break-all'
                : 'text-center break-words'
            }
          >
            {summary.title}
          </h1>
          <p class="text-lg">{summary.description}</p>
          <p class="text-gray-500">
            {summary.author}
            {' - '}
            {getTimeFromCreation(summary.created)}
          </p>
          <p>{summary.content}</p>
        </main>
      )}
    />
  )
})