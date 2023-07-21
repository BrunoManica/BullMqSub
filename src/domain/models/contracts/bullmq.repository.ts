import { Job } from 'bullmq'
import { bullmqAddMessage } from '../bullmq-types'

export const BULLMQ_REPOSITORY = 'BULLMQ_REPOSITORY'

export interface IBullmqRepository {
  criarQueue(nomeQueue: string)
  adicionarMsgQueue: (mensagem: bullmqAddMessage) => Promise<Job<any, any, string>>
  adicionarLoteMsgQueue: (mensagem: bullmqAddMessage) => Promise<Job<any, any, string>[]>
}
