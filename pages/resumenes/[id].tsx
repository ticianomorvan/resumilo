import { formatDistance, parseISO } from "date-fns";
import esLocale from "date-fns/locale/es";
import { GetServerSideProps } from "next";
import Image from "next/image";
import BaseLayout from "../../components/layouts/BaseLayout";
import { getUserDoc } from "../../lib/firebase";
import { Summary } from "../../types/summary";
import { User } from "../../types/user";

interface Props {
  summary: Summary;
  author: User;
  downloadUrl: string;
}

export default function SummaryPage({ summary, author, downloadUrl }: Props) {
  return (
    <BaseLayout title={summary.title}>
      <h1>{summary.title}</h1>
      <h2>{summary.description}</h2>
      <p>{summary.topic}</p>
      <p>
        {formatDistance(parseISO(summary.date), new Date(), {
          addSuffix: true,
          locale: esLocale,
        })}
      </p>
      <p>{author.name}</p>
      <Image
        src={author.avatar}
        alt={`${author.name}'s profile picture.`}
        width={32}
        height={32}
      />
      <a href={downloadUrl} target="_blank" rel="noreferrer">
        Descargar
      </a>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params === "undefined" || typeof params.id !== "string") {
    return { notFound: true };
  } else {
    const { id } = params;
    const { getSummaryById, getSummaryDownloadUrl } = await import(
      "../../lib/firebase"
    );
    const summary = await getSummaryById(id);
    const author = await getUserDoc(summary.author_id);
    const downloadUrl = await getSummaryDownloadUrl(summary.file_reference);

    return { props: { summary, author, downloadUrl } };
  }
};
