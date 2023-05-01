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
  const { data, error } = useSWR("/api/symbols", swrFetcher, {
    refreshInterval: 60000 * 10,
  })

  const [selectedFrom, setSelectedFrom] = useState("AED")
  const [selectedTo, setSelectedTo] = useState("USD")
  const [amount, setAmount] = useState(0)
  const [convertResult, setConvertResult] = useState(0)
  const [rateResult, setRateResult] = useState(0)
  const [convertStatus, setConvertStatus] = useState<"idle" | "loading" | "error">("idle")

  const handleChange = (event: any) => setAmount(event.target.value)

  const handleConvert = async () => {
    setConvertStatus("loading")
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
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: ConvertResponse = await response.json()
      setConvertResult(data.result)
    } catch (error) {
      console.error("Error converting currency:", error)
      setConvertStatus("error")
    } finally {
      setConvertStatus("idle")
    }

    try {
      const response = await fetch("/api/latest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbols: selectedTo,
          base: selectedFrom,
        }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setRateResult(data.rates[selectedTo])
    } catch (error) {
      console.error("Error fetching latest:", error)
      setConvertStatus("error")
    } finally {
      setConvertStatus("idle")
    }
    setConvertStatus("idle")
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
      {convertStatus === "loading" ? <Spinner /> : <Button onClick={handleConvert}>Convert</Button>}

      <FlexContainerRow>
        <FlexContainerRow>
          <label>Exchange rate:</label>
          <p>{rateResult}</p>
        </FlexContainerRow>
        <FlexContainerRow>
          <label>Converted amount:</label>
          <p>{currencyFormatter(convertResult, selectedTo)}</p>
        </FlexContainerRow>
      </FlexContainerRow>
    </FlexContainerColumn>
  )
}
