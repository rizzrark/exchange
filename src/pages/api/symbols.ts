import { fetcher, SymbolsData } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type ErrorMsg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SymbolsData | ErrorMsg>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  const data = await fetcher("/symbols", "GET")
  res.status(200).json(data)
}
