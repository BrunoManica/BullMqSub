import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'
import { IMensageriaService, MENSAGERIA_SERVICE } from 'src/domain/use-cases/mensageria.service.interface'

@Controller('mensagem')
export class PedidosController {
  constructor(@Inject(MENSAGERIA_SERVICE) private readonly iMensageriaService: IMensageriaService) {}

  @Post()
  @HttpCode(200)
  async postOrderFsj() {
    return await this.iMensageriaService.consumirMensagem('teste')
  }
}
