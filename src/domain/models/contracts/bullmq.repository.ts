import { Job } from 'bullmq'

export const BULLMQ_REPOSITORY = 'BULLMQ_REPOSITORY'

export interface IBullmqRepository {
  criarWorker(nomeQueue: string): Promise<void>
  criarWorkerAutomatico(nomeQueue: string): Promise<void>
  finalizar()
  consumirJob: (token: string) => Promise<Job<any, any, string>>
}
