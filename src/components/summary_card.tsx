import { component$ } from "@builder.io/qwik";
import { Summary } from "~/types/summary";
import { getTimeFromCreation } from "~/lib/utils";
import { Link } from "@builder.io/qwik-city";

export const SummaryCard = component$(({ data }: { data: Summary }) => {
  return (
    <Link href={`/summaries/${data.id}`}>
      <div
        id={`${data.id}-${data.title}`}
        class="m-8 p-4 border-2 border-black rounded-lg transition-transform duration-150 hover:scale-105"
      >
        <p class="font-bold text-xl">{data.title}</p>
        <p>{data.description}</p>
        <p class="text-gray-500">{getTimeFromCreation(data.created)}</p>
      </div>
    </Link>
  )
})