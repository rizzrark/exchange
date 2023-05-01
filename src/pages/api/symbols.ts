import { fetcher, SymbolsResponse } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type ErrorMsg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SymbolsResponse | ErrorMsg>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  const response = await fetcher("/symbols", "GET")
  if (response.error) {
    res
      .status(response.status || 500)
      .json({ message: response.message || "Internal Server Error" })
    return
  }
  res.status(200).json(response)
}
