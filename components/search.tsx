import { FormEvent, useCallback, useState } from "react";
import { Summary } from "../types/summary";
import { toast } from "react-hot-toast";
import SummaryModal from "./summary";
import Button from "./button";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [summaries, setSummaries] = useState<Summary[]>([]);

  const getSummaries = useCallback(async (search: string) => {
    const { filterSummaries } = await import("../lib/firebase");
    if (search.length < 5) {
      toast.error("La búsqueda debe tener como mínimo cinco caracteres.");
    } else {
      const summaries = await filterSummaries(search);
      return summaries;
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getSummaries(searchQuery).then((values) =>
      values ? setSummaries(values) : null
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 max-w-sm">
          <input
            placeholder={`Ej: "Partidos políticos"`}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            value={searchQuery}
          />
          <Button type="submit">Buscar</Button>
        </div>
      </form>
      {summaries.length > 0 && (
        <div className="grid gap-4">
          {summaries.map((summary) => (
            <SummaryModal
              key={summary.id}
              id={summary.id}
              title={summary.title}
              description={summary.description}
              topic={summary.topic}
              file_reference={summary.file_reference}
              author_id={summary.author_id}
              date={summary.date}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
