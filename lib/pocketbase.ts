import Pocketbase, { Record, User } from "pocketbase";
import { Summary, SummaryRecord } from "types/summary";

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

export const getUserById = async (id: string) => {
  try {
    const result = await client.users.getOne(id)
    return JSON.stringify(result)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSerializedSummaries: () => Promise<string> = async () => {
  try {
    const result = client.records.getList('summaries', 1, 25, { sort: '-created' }).then((data) => {
      const records = data.items as SummaryRecord[]

      return records
    })

    return JSON.stringify(await result)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSummaryById = async (id: string) => {
  try {
    const result = await client.records.getOne('summaries', id)
    return JSON.stringify(result)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSummaryDocument = (record: string, file: string) => {
  return `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/summaries/${record}/${file}`
}