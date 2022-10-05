import { Record, User } from "pocketbase";

export interface Summary {
  title: string,
  description: string,
  topic: string,
  date: string,
  document: File | string,
  author: string,
}

export interface SummaryRecord extends Record {
  title: string;
  description: string;
  topic: string;
  date: string;
  author: string;
  document: string;
}