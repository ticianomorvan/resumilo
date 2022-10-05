import BaseLayout from "components/layouts/layout";
import SummaryItem from "components/summary";
import { getSerializedSummaries } from "lib/pocketbase";
import { useEffect, useState } from "react";
import { SummaryRecord } from "types/summary";

export default function Index() {
  const [summaries, setSummaries] = useState<SummaryRecord[]>();

  useEffect(() => {
    getSerializedSummaries().then((value) => console.log(`a: ${value}`));
  }, []);
  return (
    <BaseLayout title="Resúmenes">
      <h1>Últimos resúmenes</h1>
    </BaseLayout>
  );
}
