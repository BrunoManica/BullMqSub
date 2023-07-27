import { Inject, Injectable } from '@nestjs/common'
import { UTIL_LOGGER, IUtilLogger } from 'src/domain/models/contracts/util.logger'

import { IMensageriaService } from '../mensageria.service.interface'
import { BULLMQ_REPOSITORY, IBullmqRepository } from '../../models/contracts/bullmq.repository'
import { payloadRecebidoBull } from '../../models/bullmq-types'
import config from '@app/config/config'
import { Job } from 'bullmq'
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
    } catch (error) {
      this.logger.warn('[MensageriaService.consumirMensagem] Deu ruim, mensagem veio sem data')
      await this.iBullmqRepository.finalizar()
      process.exit(1)
    }
  }
  // gerar um uuid aleatorio
  async consumirMensagem() {
    const uuiMensagem = '' //date time .now moment js com timezone
    this.logger.debug('[MensageriaService.consumirMensagem] Iniciando Consumo de mensagem')
    const jobMensagem = (await this.iBullmqRepository.consumirJob(uuiMensagem)) as Job

    if (jobMensagem) {
      await jobMensagem.extendLock(uuiMensagem, 30000)
      if (!jobMensagem?.data) {
        this.logger.warn('[MensageriaService.consumirMensagem] Deu ruim, mensagem veio sem data')
        throw new Error('Deu ruim, mensagem veio sem data')
      }

      this.logger.debug('[MensageriaService.gerarMessagem] iniciando envio de mensagem para seu devido destinatario')

      const sucesso = await this.enviarMensagem(jobMensagem.data)

      if (sucesso) {
        await jobMensagem.moveToCompleted('Sucesso ao consumir a mensagem', uuiMensagem, false)
      } else {
        await jobMensagem.moveToFailed(new Error('deu muito ruim, mas vamos tratar'), uuiMensagem, false)
      }
      this.logger.debug('[MensageriaService.gerarMessagem] mensagem enviada, requisitando a proxima')
    } else {
      this.logger.debug('[MensageriaService.consumirMensagem] Sem mensagens na fila')
    }

    await this.consumirMensagem()
  }

  enviarMensagem(mensagem: payloadRecebidoBull) {
    return this.iRequisicoesService.enviarRequisicao(mensagem)
  }
}
