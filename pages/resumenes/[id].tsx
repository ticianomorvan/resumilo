import Button from "components/button";
import BaseLayout from "components/layouts/layout";
import {
  getSummaryById,
  getSummaryDocument,
  getUserById,
} from "lib/pocketbase";
import { useRouter } from "next/router";
import { User } from "pocketbase";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { downloadButton } from "styles/pages/resumenes.css";
import { SummaryRecord } from "types/summary";

export default function SummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<SummaryRecord>();
  const [user, setUser] = useState<User>();

  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === "string") {
      getSummaryById(id)
        .then((value) => JSON.parse(value) as SummaryRecord)
        .then((result) => setSummary(result));
    }
  }, [id]);

  useEffect(() => {
    if (summary) {
      getUserById(summary.author)
        .then((value) => JSON.parse(value) as User)
        .then((result) => setUser(result));
    }
  }, [summary]);

  if (!summary || !user) return <p>Cargando...</p>;

  return (
    <BaseLayout title={summary.title}>
      <h1>{summary.title}</h1>
      <h2>{summary.description}</h2>
      <p>{user.id}</p>
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
    </BaseLayout>
  );
}
