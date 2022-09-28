import { Summary } from "./summary";

export interface User {
  id: string,
  name: string,
  avatar: string,
  email: string,
  summaries: Summary[]
}