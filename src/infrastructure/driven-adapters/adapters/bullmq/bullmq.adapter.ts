import { Job, Worker } from 'bullmq'
import config from 'src/application/config/config'
import { IBullmqRepository } from 'src/domain/models/contracts/bullmq.repository'

export class BullmqAdapter implements IBullmqRepository {
  private worker: Worker

  criarWorker(nomeQueue: string): Promise<void> {
    this.worker = new Worker(nomeQueue, null, {
      connection: {
        host: config.REDIS_URL,
        port: config.REDIS_PORT,
      },
    })

    return
  }

  criarWorkerAutomatico(nomeQueue: string): Promise<void> {
    this.worker = new Worker(
      nomeQueue,
      async (job: Job) => {
        console.log('ok')
        // Optionally report some progress
        await job.updateProgress({ sucesso: 'ok' })
      },
      {
        // maxStalledCount: 2, // controla a qte de vezes que o dado pode ser re enviado antes de ser considerado com uma falha
        removeOnComplete: {
          count: 200, // quantidade maxima de jobs ativos
        },
        // removeOnComplete:
        connection: {
          host: config.REDIS_URL,
          port: config.REDIS_PORT,
        },
      },
    )

    return
  }

  async finalizar() {
    return this.worker.close()
  }

  async consumirJob(token: string): Promise<Job<any, any, string>> {
    return this.worker.getNextJob(token)
  }
}
