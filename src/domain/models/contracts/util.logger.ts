export const UTIL_LOGGER = 'UTIL_LOGGER'

export interface IUtilLogger {
  warn: (message: string) => void
  info: (message: string) => void
  debug: (message: string) => void
  error: (message: string) => void
}
