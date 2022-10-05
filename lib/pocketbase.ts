import Pocketbase, { Record, User } from "pocketbase";
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

interface UserProfile {
  name: string,
  avatar: File
}

export const updateUserProfile = async (id: string, data: UserProfile) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('avatar', data.avatar)

  try {
    client.records.update('profiles', id, formData)
  } catch (error: any) {
    throw new Error(error)
  }
}

interface SummaryRecord extends Record {
  title: string;
  description: string;
  topic: string;
  date: string;
  author: string;
  document: string;
}

export const getSerializedSummaries: () => Promise<string> = async () => {
  try {
    const result = client.records.getList('summaries', 1, 25, { sort: '-created' }).then((data) => {
      const records = data.items as SummaryRecord[]

      records.map(async (record) => {
        const author = await client.users.getOne(record.author)
        author ? console.log(JSON.stringify(author)) : console.log('B')
        return {
          id: record.id,
          title: record.title,
          description: record.description,
          topic: record.topic,
          date: record.date,
          document: record.document,
          author: author.email
        }
      })

      return records
    })

    return JSON.stringify(await result)
  } catch (error: any) {
    throw new Error(error)
  }
}