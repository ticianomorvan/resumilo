import { Summary } from "../types/summary";

interface Index {
  id: string,
  indexes: string[]
}

export const storeSummaryIndexes = (summary: Summary) => {
  if (typeof window !== "undefined") {
    const indexes: Index = {
      id: summary.id,
      indexes: [
        summary.title.toLowerCase(),
        summary.description.toLowerCase(),
        summary.topic.toLowerCase()
      ]
    }
    localStorage.setItem('summaries', JSON.stringify(indexes))
  }
}

export const getLocalIndexes = () => {
  if (typeof window !== "undefined") {
    const indexes = localStorage.getItem('summaries')
    if (indexes) return JSON.parse(indexes) as Index[]
  }
}

export const filterIndexes = (indexes: Index[], query: string) => {
  let matchingIds: string | string[] = [];
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].indexes.some((index) => index.includes(query))) {
      matchingIds = [...matchingIds, indexes[i].id]
    }
  }


  return matchingIds;
}