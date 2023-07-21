import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'
import { bullmqAddMessage } from 'src/domain/models/bullmq-types'
import { IMensageriaService, MENSAGERIA_SERVICE } from 'src/domain/use-cases/mensageria.service.interface'

@Controller('mensagem')
export class PedidosController {
  constructor(@Inject(MENSAGERIA_SERVICE) private readonly iMensageriaService: IMensageriaService) {}

  @Post()
  @HttpCode(200)
  async postOrderFsj(@Body() payload: bullmqAddMessage) {
    return await this.iMensageriaService.gerarMessagem(payload)
  }
}
