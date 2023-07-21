import { Inject, Injectable } from '@nestjs/common'
import { UTIL_LOGGER, IUtilLogger } from 'src/domain/models/contracts/util.logger'

import { IMensageriaService } from '../mensageria.service.interface'
import { BULLMQ_REPOSITORY, IBullmqRepository } from '../../models/contracts/bullmq.repository'
import { bullmqAddMessage } from '../../models/bullmq-types'

@Injectable()
export class MensageriaService implements IMensageriaService {
  constructor(
    @Inject(UTIL_LOGGER) private readonly logger: IUtilLogger,
    @Inject(BULLMQ_REPOSITORY) private readonly iBullmqRepository: IBullmqRepository,
  ) {
    this.iBullmqRepository.criarQueue('poc-promo')
  }

  async gerarMessagem(payload: bullmqAddMessage): Promise<void> {
    this.logger.debug('[MensageriaService.gerarMessagem] Gerando mensagem')
    try {
      const retorno = await this.iBullmqRepository.adicionarMsgQueue(payload)
      console.log(retorno)
    } catch (error) {
      this.logger.debug('[MensageriaService.gerarMessagem] erro ao gera mensagem')
      console.log(error)
    }

    return Promise.resolve()
  }
}
