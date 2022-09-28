import {
  Button,
  Grid,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useState } from "react";
import { errorToast } from "../lib/utils";
import { Summary } from "../types/summary";
import SummaryItem from "./summary";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const toast = useToast();

  const getSummaries = useCallback(
    async (search: string) => {
      const { filterSummaries } = await import("../lib/firebase");
      if (search.length < 5) {
        toast(
          errorToast("La búsqueda debe tener como mínimo cinco caracteres.")
        );
        return;
      } else {
        const summaries = await filterSummaries(search);
        return summaries;
      }
    },
    [toast]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getSummaries(searchQuery).then((values) =>
      values ? setSummaries(values) : null
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HStack gap={4} width="xs" marginY={4}>
          <Input
            placeholder={`Ej: "Partidos políticos"`}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            value={searchQuery}
          />
          <Button colorScheme="green" type="submit">
            Buscar
          </Button>
        </HStack>
      </form>
      {summaries.length > 0 && (
        <Grid gap={2}>
          {summaries.map((summary) => (
            <SummaryItem
              key={summary.id}
              id={summary.id}
              title={summary.title}
              topic={summary.topic}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Search;
