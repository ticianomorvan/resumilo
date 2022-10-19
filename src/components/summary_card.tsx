import { component$, useStyles$ } from "@builder.io/qwik";
import { Summary } from "~/types/summary";
import { getTimeFromCreation } from "~/lib/utils";
import { Link } from "@builder.io/qwik-city";
import styles from "~/styles/components/summary_card.css"

export const SummaryCard = component$(({ data }: { data: Summary }) => {
  useStyles$(styles)

  return (
    <Link href={`/summaries/${data.id}`}>
      <div id={`${data.id}-${data.title}`}>
        <p class="title">{data.title}</p>
        <p class="description">{data.description}</p>
        <p class="created">{getTimeFromCreation(data.created)}</p>
      </div>
    </Link>
  )
})