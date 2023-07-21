export type axiosPayload = {
  method: string
  url: string
  data?: any
  headers: axiosHeaders
}

export type axiosHeaders = {
  'Content-Type': 'application/json'
  apiKey?: string
}
