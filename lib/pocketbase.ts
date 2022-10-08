import Pocketbase from 'pocketbase';
import { Summary, SummaryRecord } from 'types/summary';
import { SHA256, enc } from 'crypto-js';

export const client = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE);

export const createSummary = async (summary: Summary) => {
  const formData = new FormData();
  formData.append('title', summary.title);
  formData.append('description', summary.description);
  formData.append('date', summary.date);
  formData.append('document', summary.document);
  formData.append('topic', summary.topic);
  formData.append('author', summary.author);

  try {
    client.records.create('summaries', formData);
  } catch (error: any) {
    throw new Error(error);
  }
};

interface UserProfile {
  name: string,
  avatar: File
}

/**
 * Create an user using their email and password.
 * The password confirm isn't needed here because it's handled in the client.
 */
export const createUser = async (email: string, password: string) => {
  try {
    const passwordHash = SHA256(password).toString(enc.Base64);
    await client.users.create({
      email,
      password: passwordHash,
      passwordConfirm: passwordHash,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const authUser = async (email: string, password: string) => {
  try {
    const passwordHash = SHA256(password).toString(enc.Base64);
    await client.users.authViaEmail(email, passwordHash);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserProfile = async (id: string, data: UserProfile) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('avatar', data.avatar);

  try {
    client.records.update('profiles', id, formData);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await client.users.getOne(id);
    return JSON.stringify(result);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSerializedSummaries = async () => {
  try {
    const result = await client.records.getList('summaries', 1, 25, { sort: '-created' });
    const data = result.items.map((record) => {
      const {
        id, author, title, description, topic, date, document,
      } = record as SummaryRecord;
      return {
        id, author, title, description, topic, date, document,
      };
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSummaryById = async (id: string) => {
  try {
    const {
      id: recordId, title, description, topic, date, document, author,
    } = await client.records.getOne('summaries', id) as SummaryRecord;

    const data: Summary = {
      id: recordId,
      title,
      description,
      topic,
      date,
      document,
      author,
    };

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSummaryDocument = (record: string, file: string) => `${process.env.NEXT_PUBLIC_POCKETBASE}/api/files/summaries/${record}/${file}`;
