import { Inject, Injectable } from '@nestjs/common'
import { IPedidoService } from '../pedido.service.interface'
import { UTIL_LOGGER, IUtilLogger } from 'src/domain/models/contracts/util.logger'

@Injectable()
export class PedidoService implements IPedidoService {
  constructor(@Inject(UTIL_LOGGER) private readonly logger: IUtilLogger) {}

  async inspecionarPedido(headers: Record<string, string>, payloadIntegracao: any): Promise<void> {
    const origemPedido = payloadIntegracao.origemPedido
    const incrementId = payloadIntegracao.incrementId

    this.logger.info(
      `[PedidoService.inspecionarPedido] Inciando inspeção de pedido do canal digital - ${origemPedido} com o incrementId ${incrementId}`,
    )

    this.logger.info(
      `[PedidoService.inspecionarPedido] Finalizando inspeção de pedido
      OrigemPedido: ${payloadIntegracao.origemPedido}
      IncrementId: ${payloadIntegracao.incrementId}`,
    )

    return null
  }
}
