const baseURL = process.env.BASE_URL
const apikey = process.env.API_KEY

export const fetcher = async (
  endpoint: string,
  method = "GET",
  options = {
    headers: {
      apikey: apikey as string,
    },
  }
) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method,
      ...options,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
