import { ConvertResponse, fetcher, SymbolsResponse } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type ErrorMsg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConvertResponse | ErrorMsg>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  const { amount, to, from } = req.body
  const params = new URLSearchParams({
    amount,
    from,
    to,
  })
  const response = await fetcher(`/convert?${params}`, "GET")
  if (response.error) {
    res
      .status(response.status || 500)
      .json({ message: response.message || "Internal Server Error" })
    return
  }
  res.status(200).json(response)
}
