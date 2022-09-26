import { Resumen } from "./resumen";

export interface User {
  name: string,
  avatar: string,
  email: string,
  resumenes: Resumen[]
}