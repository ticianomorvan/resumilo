import { NextApiRequest, NextApiResponse } from "next";
import { client } from "lib/pocketbase"
import { enc, SHA256 } from "crypto-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body) as { email: string, password: string }

  try {
    const action = await client.users.authViaEmail(email, SHA256(password).toString(enc.Base64))
    res.status(200).json({ user: action.user, token: action.token })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}