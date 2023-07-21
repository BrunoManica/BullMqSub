import { Job, Worker } from 'bullmq'
import config from 'src/application/config/config'
import { IBullmqRepository } from 'src/domain/models/contracts/bullmq.repository'

export class BullmqAdapter implements IBullmqRepository {
  private worker: Worker

  criarWorker(nomeQueue: string) {
    this.worker = new Worker(nomeQueue, null, {
      autorun: true,
      // maxStalledCount: 2, // controla a qte de vezes que o dado pode ser re enviado antes de ser considerado com uma falha
      // removeOnComplete: {
      //   count: 100, // quantidade maxima de jobs ativos
      // },
      connection: {
        host: config.REDIS_URL,
        port: config.REDIS_PORT,
      },
    })
  }

  async consumirJob(token: string): Promise<Job<any, any, string>> {
    return this.worker.getNextJob(token)
  }

  /*adicionarMsgQueue(mensagem: bullmqAddMessage): Promise<Job<any, any, string>> {
    this.worker.disconnect()
    this.worker.processJob()
    return this.worker.add(mensagem.name, mensagem.data, mensagem.opts)
  }
  */
}
