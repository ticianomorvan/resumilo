import { Record } from "pocketbase";
import { Summary } from "~/types/summary";

export const convertToSummary = (record: Record) => {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    content: record.content,
    created: record.created
  } as Summary
}