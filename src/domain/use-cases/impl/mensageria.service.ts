import { Inject, Injectable } from '@nestjs/common'
import { UTIL_LOGGER, IUtilLogger } from 'src/domain/models/contracts/util.logger'

import { IMensageriaService } from '../mensageria.service.interface'
import { BULLMQ_REPOSITORY, IBullmqRepository } from '../../models/contracts/bullmq.repository'
import { payloadRecebidoBull } from '../../models/bullmq-types'
import config from '@app/config/config'
import { Job } from 'bullmq'
import { API_FSJ_REPOSITORY, IApiFsjRepository } from '@domain/models/contracts/api-fsj.repository'
import { IRequisicoesService, REQUISICOES_SERVICE } from '../requisicoes.service.interface'

@Injectable()
export class MensageriaService implements IMensageriaService {
  constructor(
    @Inject(UTIL_LOGGER) private readonly logger: IUtilLogger,
    @Inject(BULLMQ_REPOSITORY) private readonly iBullmqRepository: IBullmqRepository,
    @Inject(REQUISICOES_SERVICE) private readonly iRequisicoesService: IRequisicoesService,
  ) {
    this.criarWorker()
  }

  async criarWorker() {
    try {
      await this.iBullmqRepository.criarWorker(config.BULLMQ_QUEUE)
      this.consumirMensagem('promocao1')
    } catch (error) {
      console.log(error)
    }
  }
  // gerar um uuid aleatorio
  async consumirMensagem(uuiMensagem: string) {
    this.logger.debug('[MensageriaService.consumirMensagem] Iniciando Consumo de mensagem')
    const jobAux = await this.iBullmqRepository.consumirJob(uuiMensagem)
    const job = jobAux as Job

    if (!job?.data) {
      this.logger.warn('[MensageriaService.consumirMensagem] Deu ruim, mensagem veio sem data')
      console.log('deu ruim pq ?', job)
      throw new Error('Deu ruim')
      //this.consumirMensagem('promocao')
    }

    this.logger.debug('[MensageriaService.gerarMessagem] iniciando envio de mensagem para seu devido destinatario')

    const sucesso = await this.enviarMensagem(job.data)

    if (sucesso) {
      await job.moveToCompleted('deu bom', uuiMensagem, true)
    } else {
      await job.moveToFailed(new Error('deu muito ruim, mas vamos tratar'), uuiMensagem, true)
    }

    this.logger.debug('[MensageriaService.gerarMessagem] mensagem enviada, requisitando a proxima')
    await this.consumirMensagem('promocao')
  }

  enviarMensagem(mensagem: payloadRecebidoBull) {
    return this.iRequisicoesService.enviarRequisicao(mensagem)
  }
}

/// pesquisar sobre o lock creio que n esta consumindo direito  as msgs
