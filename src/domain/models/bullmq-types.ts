import { JobsOptions } from 'bullmq'

export type bullmqAddMessage = {
  name: string
  data: any
  opts?: JobsOptions
}
