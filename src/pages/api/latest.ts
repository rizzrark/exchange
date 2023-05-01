import { ConvertResponse, fetcher } from "@/lib"
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
  const { symbols, base } = req.body
  const params = new URLSearchParams({
    symbols,
    base,
  })
  const response = await fetcher(`/latest?${params}`, "GET")
  if (response.error) {
    res
      .status(response.status || 500)
      .json({ message: response.message || "Internal Server Error" })
    return
  }
  res.status(200).json(response)
}
