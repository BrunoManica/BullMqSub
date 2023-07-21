import { payloadRecebidoBull } from '@domain/models/bullmq-types'

export const REQUISICOES_SERVICE = 'REQUISICOES_SERVICE'

export interface IRequisicoesService {
  enviarRequisicao: (mensagem: payloadRecebidoBull) => Promise<boolean>
}
