export const PEDIDO_SERVICE = 'PEDIDO_SERVICE'

export interface IPedidoService {
  inspecionarPedido(headers: Record<string, string>, payloadIntegracao: any)
}
