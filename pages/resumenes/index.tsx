import { getSerializedSummaries } from "lib/pocketbase";
import { GetServerSideProps } from "next";
import { SummaryRecord } from "types/summary";

// Components & Styling
import BaseLayout from "components/layouts/layout";
import SummaryItem from "components/summary";
import { summariesContainer } from "styles/pages/resumenes.css";

interface Props {
  summaries: SummaryRecord[];
}

export default function Index({ summaries }: Props) {
  return (
    <BaseLayout title="Resúmenes">
      <h1>Últimos resúmenes</h1>
      <div className={summariesContainer}>
        {summaries &&
          summaries.map((summary) => (
            <SummaryItem key={summary.id} data={summary} />
          ))}
      </div>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const summaries = await getSerializedSummaries();
  return {
    props: {
      summaries,
    },
  };
};
