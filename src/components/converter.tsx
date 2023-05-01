import {
  Button,
  FlexContainerColumn,
  FlexContainerRow,
  Input,
  Spinner,
} from "@/components/sharedstyles"
import { currencyFormatter } from "@/helpers"
import { ConvertResponse, SymbolsResponse } from "@/lib"
import { useState } from "react"
import useSWR from "swr"
import { Select } from "@/components/select"

const swrFetcher = (url: string): Promise<SymbolsResponse> => fetch(url).then((r) => r.json())

export const Converter = () => {
  const { data, error } = useSWR("/api/symbols", swrFetcher)

  const [selectedFrom, setSelectedFrom] = useState("AED")
  const [selectedTo, setSelectedTo] = useState("USD")
  const [amount, setAmount] = useState(0)
  const [convertResult, setConvertResult] = useState(0)

  const handleChange = (event: any) => setAmount(event.target.value)

  const handleConvert = async () => {
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          from: selectedFrom,
          to: selectedTo,
        }),
      })
      console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: ConvertResponse = await response.json()
      setConvertResult(data.result)
    } catch (error) {
      console.error("Error converting currency:", error)
    }
  }

  if (!data) return <Spinner />
  if (error) return <div> Oops something went wrong :( </div>

  return (
    <FlexContainerColumn>
      <FlexContainerRow>
        <label> From </label>
        <Select
          value={selectedFrom}
          onChange={setSelectedFrom}
          options={Object.keys(data?.symbols || {})}
        />
        <label> To </label>
        <Select
          value={selectedTo}
          onChange={setSelectedTo}
          options={Object.keys(data?.symbols || {})}
        />
        <form>
          <FlexContainerRow>
            <label htmlFor="name">Amount:</label>
            <Input
              id="name"
              type="number"
              placeholder="Amount to convert"
              value={amount}
              onChange={handleChange}
            />
          </FlexContainerRow>
        </form>
      </FlexContainerRow>
      <Button onClick={handleConvert}>Convert</Button>
      <FlexContainerRow>
        <label>Result </label>
        <p>{currencyFormatter(convertResult, selectedTo)}</p>
      </FlexContainerRow>
    </FlexContainerColumn>
  )
}
