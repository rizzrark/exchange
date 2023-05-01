export const currencyFormatter = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    // maximumSignificantDigits: 4,
    currencySign: "accounting",
    currency,
  }).format(value)
