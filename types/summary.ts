import { User } from "pocketbase";

export interface Summary {
  title: string,
  description: string,
  topic: string,
  date: string,
  document: File | string,
  author: string,
}

export interface SummaryRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  topic: string;
  author: User;
  document: string;
}