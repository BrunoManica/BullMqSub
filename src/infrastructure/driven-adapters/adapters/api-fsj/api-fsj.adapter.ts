import { axiosPayload } from '@domain/models/axiosj-type'
import { IApiFsjRepository } from '@domain/models/contracts/api-fsj.repository'
import axios, { AxiosInstance } from 'axios'

export class ApiFsjAdapter implements IApiFsjRepository {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create()
  }
  enviarRequisicaoGenerica(mensagem: axiosPayload) {
    console.log('enviando a requisição -->', mensagem)
    // return this.axiosInstance(mensagem)
  }
}
