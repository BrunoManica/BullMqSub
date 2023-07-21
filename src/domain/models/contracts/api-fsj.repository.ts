import { axiosPayload } from '../axiosj-type'

export const API_FSJ_REPOSITORY = 'API_FSJ_REPOSITORY'

export interface IApiFsjRepository {
  enviarRequisicaoGenerica(mensagem: axiosPayload)
}
