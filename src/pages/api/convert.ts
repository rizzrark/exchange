import { ConvertResponse, fetcher, SymbolsResponse } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type ErrorMsg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConvertResponse | ErrorMsg>
) {
  console.log(req.body)
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

  const data: ConvertResponse = await fetcher(`/convert?${params}`, "GET")
  res.status(200).json(data)
}
