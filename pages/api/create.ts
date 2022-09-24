import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, content, date } = req.body
  await prisma.resumen.create({
    data: {
      name, content, date
    }
  }).then(() => res.status(200))
}