export interface Author {
  avatar: string,
  mercado_pago: string,
  name: string
}

export interface Resumen {
  title: string,
  description: string,
  topic: string,
  date: string,
  file_reference: string,
  author: Author,
}