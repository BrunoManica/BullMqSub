import { bullmqAddMessage } from '../models/bullmq-types'

export const MENSAGERIA_SERVICE = 'MENSAGERIA_SERVICE'

export interface IMensageriaService {
  gerarMessagem: (payload: bullmqAddMessage) => Promise<void>
}
