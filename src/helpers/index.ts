export const currencyFormatter = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currencySign: "accounting",
    currency,
  }).format(value)
