import { getSummaryById, getSummaryDocument, getUserById } from 'lib/pocketbase';
import { GetServerSideProps } from 'next';
import { FaDownload } from 'react-icons/fa';
import { downloadButton } from 'styles/pages/resumenes.css';
import { SummaryRecord } from 'types/summary';
import { User } from 'pocketbase';

// Components
import BaseLayout from 'components/layouts/base';
import Button from 'components/button';
import Profile from 'components/profile';
import { useEffect, useState } from 'react';

interface Props {
  raw: string;
}

// This works a little bit weird, because the record got
// from "getSummaryId" is not formatted the same as the rest,
// so, in order to avoid Next.js serializing problems, we
// have to stringify it with JSON. Then, in the client, we
// parse it and show the page. Looking to improve this...

export default function SummaryPage({ raw }: Props) {
  const [user, setUser] = useState<User>();
  const [summary, setSummary] = useState<SummaryRecord>();

  useEffect(() => {
    setSummary(JSON.parse(raw) as SummaryRecord);
  }, [raw]);

  useEffect(() => {
    if (!summary) return;
    getUserById(summary.author).then((value) => setUser(value));
  }, [summary]);

  if (!summary) return <p>Cargando...</p>;

  return (
    <BaseLayout title={summary.title}>
      <h1>{summary.title}</h1>
      <p>{summary.description.length > 0 ? summary.description : 'No se dió una descripción.'}</p>
      <a
        href={getSummaryDocument(summary.id, summary.document)}
        target="_blank"
        rel="noreferrer"
      >
        <Button>
          <span className={downloadButton}>
            <FaDownload />
            Descargar
          </span>
        </Button>
      </a>

      {user && <Profile data={user} />}
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const id = String(params.id);
    const raw = await getSummaryById(id);

    return {
      props: {
        raw,
      },
    };
  }

  return {
    notFound: true,
  };
};
