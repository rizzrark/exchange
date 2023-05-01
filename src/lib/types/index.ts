type Info = {
  rate: number
  timestamp: number
}

type Query = {
  amount: number
  from: string
  to: string
}

export type ConvertResponse = {
  date: Date
  historical: string
  info: Info
  query: Query
  result: number
  success: boolean
}

export type SymbolsResponse = {
  success: boolean
  symbols: { [key: string]: string }
}
