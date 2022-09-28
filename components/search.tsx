import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { FormEvent, useCallback, useState } from "react";
import { Summary } from "../types/summary";
import SummaryItem from "./summary";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [summaries, setSummaries] = useState<Summary[]>([]);

  const getSummaries = useCallback(async (search: string) => {
    const { firebase, filterSummaries } = await import("../lib/firebase");
    const summaries = await filterSummaries(firebase, search);
    return summaries;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getSummaries(searchQuery).then((values) => setSummaries(values));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HStack gap={4} width="xs" marginY={4}>
          <Input
            placeholder={`Ej: "Partidos políticos"`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button colorScheme="green" type="submit">
            Buscar
          </Button>
        </HStack>
      </form>
      {summaries.length > 0 && (
        <VStack gap={2}>
          {summaries.map((summary) => (
            <SummaryItem
              key={summary.id}
              id={summary.id}
              title={summary.title}
              author_id={summary.author_id}
              topic={summary.topic}
            />
          ))}
        </VStack>
      )}
    </>
  );
};

export default Search;
