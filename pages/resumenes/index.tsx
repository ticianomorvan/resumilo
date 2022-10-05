import BaseLayout from "components/layouts/layout";
import SummaryItem from "components/summary";
import { getSerializedSummaries } from "lib/pocketbase";
import { useEffect, useState } from "react";
import { SummaryRecord } from "types/summary";

export default function Index() {
  const [summaries, setSummaries] = useState<SummaryRecord[]>();

  useEffect(() => {
    getSerializedSummaries()
      .then((value) => JSON.parse(value) as SummaryRecord[])
      .then((records) => setSummaries(records));
  }, []);
  return (
    <BaseLayout title="Resúmenes">
      <h1>Últimos resúmenes</h1>
      <div>
        {summaries &&
          summaries.map((summary) => (
            <SummaryItem key={summary.id} data={summary} />
          ))}
      </div>
    </BaseLayout>
  );
}
