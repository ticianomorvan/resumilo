import { FormEvent, useCallback, useState } from "react";
import { Summary } from "../types/summary";
import { toast } from "react-hot-toast";
import { search } from "../styles/components.css";
import Button from "./button";
import Link from "next/link";

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
        <div className={search.container}>
          <input
            className={search.input}
            placeholder={`Ej: "Partidos políticos"`}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            value={searchQuery}
          />
          <Button type="submit">Buscar</Button>
        </div>
      </form>
      {summaries.length > 0 &&
        summaries.map(({ id, title }) => (
          <Link key={id} href={`/resumenes/${encodeURIComponent(id)}`}>
            {title}
          </Link>
        ))}
    </>
  );
};

export default Search;
