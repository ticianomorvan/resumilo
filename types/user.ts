import { Summary } from "./summary";

export interface User {
  name: string,
  avatar: string,
  email: string,
  summaries: Summary[]
}