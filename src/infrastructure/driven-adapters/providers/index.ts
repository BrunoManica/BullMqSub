import { UTIL_LOGGER } from 'src/domain/models/contracts/util.logger'
import { RequisicoesService } from 'src/domain/use-cases/impl/requisicoes.service'
import { REQUISICOES_SERVICE } from '@domain/use-cases/requisicoes.service.interface'
import { UtilLoggerAdapter } from '../adapters/util.logger.adapter'
import { BULLMQ_REPOSITORY } from 'src/domain/models/contracts/bullmq.repository'
import { MENSAGERIA_SERVICE } from 'src/domain/use-cases/mensageria.service.interface'
import { BullmqAdapter } from '../adapters/bullmq/bullmq.adapter'
import { MensageriaService } from 'src/domain/use-cases/impl/mensageria.service'
import { API_FSJ_REPOSITORY } from '@domain/models/contracts/api-fsj.repository'
import { ApiFsjAdapter } from '../adapters/api-fsj/api-fsj.adapter'

export const adapters = [
  {
    provide: BULLMQ_REPOSITORY,
    useClass: BullmqAdapter,
  },
  {
    provide: API_FSJ_REPOSITORY,
    useClass: ApiFsjAdapter,
  },
  {
    provide: UTIL_LOGGER,
    useClass: UtilLoggerAdapter,
  },
]

export const services = [
  {
    provide: REQUISICOES_SERVICE,
    useClass: RequisicoesService,
  },
  {
    provide: MENSAGERIA_SERVICE,
    useClass: MensageriaService,
  },
]
