import Pocketbase from "pocketbase";
import { Summary } from "types/summary";

export const client = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE)

export const createSummary = async (summary: Summary) => {
  const formData = new FormData()
  formData.append('title', summary.title)
  formData.append('description', summary.description)
  formData.append('date', summary.date)
  formData.append('document', summary.document)
  formData.append('topic', summary.topic)
  formData.append('author', summary.author)

  try {
    client.records.create('summaries', formData)
  } catch (error: any) {
    throw new Error(error)
  }
}