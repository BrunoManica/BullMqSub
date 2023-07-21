import { UTIL_LOGGER } from 'src/domain/models/contracts/util.logger'
import { MongoService } from 'src/domain/use-cases/impl/mongo.service'
import { PedidoService } from 'src/domain/use-cases/impl/pedido.service'
import { MONGO_SERVICE } from 'src/domain/use-cases/mongo.service.interface'
import { PEDIDO_SERVICE } from 'src/domain/use-cases/pedido.service.interface'
import { UtilLoggerAdapter } from '../adapters/util.logger.adapter'
import { BULLMQ_REPOSITORY } from 'src/domain/models/contracts/bullmq.repository'
import { MENSAGERIA_SERVICE } from 'src/domain/use-cases/mensageria.service.interface'
import { BullmqAdapter } from '../adapters/bullmq/bullmq.adapter'
import { MensageriaService } from 'src/domain/use-cases/impl/mensageria.service'

export const adapters = [
  {
    provide: BULLMQ_REPOSITORY,
    useClass: BullmqAdapter,
  },
  {
    provide: UTIL_LOGGER,
    useClass: UtilLoggerAdapter,
  },
]

export const services = [
  {
    provide: PEDIDO_SERVICE,
    useClass: PedidoService,
  },
  {
    provide: MONGO_SERVICE,
    useClass: MongoService,
  },
  {
    provide: MENSAGERIA_SERVICE,
    useClass: MensageriaService,
  },
]
