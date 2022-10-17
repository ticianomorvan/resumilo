import { component$, useStyles$ } from "@builder.io/qwik";
import { Summary } from "~/types/summary";
import styles from "~/styles/components/summary_card.css"
import { getTimeFromCreation } from "~/lib/utils";

export const SummaryCard = component$(({ data }: { data: Summary }) => {
  useStyles$(styles)

  return (
    <div id={`${data.id}-${data.title}`}>
      <p class="title">{data.title}</p>
      <p class="description">{data.description}</p>
      <p class="created">{getTimeFromCreation(data.created)}</p>
    </div>
  )
})