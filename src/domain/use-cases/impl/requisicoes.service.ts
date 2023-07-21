import { Inject, Injectable } from '@nestjs/common'
import { IRequisicoesService } from '../requisicoes.service.interface'
import { UTIL_LOGGER, IUtilLogger } from 'src/domain/models/contracts/util.logger'
import { payloadRecebidoBull } from '@domain/models/bullmq-types'
import { axiosPayload } from '@domain/models/axiosj-type'
import { API_FSJ_REPOSITORY, IApiFsjRepository } from '@domain/models/contracts/api-fsj.repository'
import axios from 'axios'

@Injectable()
export class RequisicoesService implements IRequisicoesService {
  constructor(
    @Inject(UTIL_LOGGER) private readonly logger: IUtilLogger,
    @Inject(API_FSJ_REPOSITORY) private readonly iApiFsjRepository: IApiFsjRepository,
  ) {}
  async enviarRequisicao(mensagem: payloadRecebidoBull): Promise<boolean> {
    try {
      const mensagemMapeada = this.mapearRequisicaoGenerica(mensagem)

      const retorno = await this.efetuarRequisicaoGenerica(mensagemMapeada)
      return Promise.resolve(true)
    } catch (error) {
      return Promise.resolve(false)
    }
  }

  private efetuarRequisicaoGenerica(mensagemMapeada: axiosPayload) {
    return this.iApiFsjRepository.enviarRequisicaoGenerica(mensagemMapeada)
  }

  private mapearRequisicaoGenerica(mensagem: payloadRecebidoBull): axiosPayload {
    this.logger.debug(`[RequisicoesService.mapearRequisicaoGenerica] :: Mapeando a requisição`)
    const headers: axiosPayload['headers'] = {
      'Content-Type': 'application/json',
    }

    if (mensagem.token) {
      headers.apiKey = mensagem.token
    }

    const requisicao: axiosPayload = {
      method: mensagem.method,
      url: mensagem.url,
      headers,
      data: mensagem.data || undefined,
    }

    return requisicao
  }
}
