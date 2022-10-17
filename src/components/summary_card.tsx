import { component$ } from "@builder.io/qwik";
import { Summary } from "~/types/summary";

export const SummaryCard = component$(({ data }: { data: Summary }) => {
  return (
    <div id={data.id}>
      <p>{data.title}</p>
      <p>{data.description}</p>
      <p>{data.created}</p>
    </div>
  )
})