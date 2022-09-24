import { PrismaClient, resumen } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<resumen[]>) {
  const resumenes = await prisma.resumen.findMany()
  res.json(resumenes)
}