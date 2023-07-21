import { Job, Queue } from 'bullmq'
import config from 'src/application/config/config'
import { bullmqAddMessage } from 'src/domain/models/bullmq-types'
import { IBullmqRepository } from 'src/domain/models/contracts/bullmq.repository'

export class BullmqAdapter implements IBullmqRepository {
  private queue

  criarQueue(nomeQueue: string) {
    this.queue = new Queue(nomeQueue, {
      connection: {
        host: config.REDIS_URL,
        port: config.REDIS_PORT,
      },
    })
  }

  adicionarMsgQueue(mensagem: bullmqAddMessage): Promise<Job<any, any, string>> {
    return this.queue.add(mensagem.name, mensagem.data, mensagem.opts)
  }

  adicionarLoteMsgQueue(mensagem: bullmqAddMessage) {
    return this.queue.addBulk([
      { name: 'name', data: { paint: 'car' } },
      { name: 'name', data: { paint: 'house' } },
      { name: 'name', data: { paint: 'boat' } },
    ])
  }
}
