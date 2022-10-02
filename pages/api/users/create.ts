import { client } from "lib/pocketbase";
import { SHA256, enc } from "crypto-js"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body) as { email: string, password: string }
  const passwordHash = SHA256(password)

  try {
    await client.users.create({
      email: email,
      password: passwordHash.toString(enc.Base64),
      passwordConfirm: passwordHash.toString(enc.Base64),
    }).then(async () => {
      const { token, user } = await client.users.authViaEmail(email, passwordHash.toString(enc.Base64))
      res.status(200).json({ token: token, user: user })
    })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}