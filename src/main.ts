import { NestFactory } from '@nestjs/core'
import { AppContainer } from 'src/application/app'
import helmet from 'helmet'
import config from 'src/application/config/config'
import { connect } from 'mongoose'
import { Queue } from 'bullmq'

async function start() {
  console.log('DB Mongo connected')
  await connect(config.MONGO_URL)

  const app = await NestFactory.create(AppContainer)
  app.use(helmet())
  await app.listen(config.PORT, () => console.log('Running on port: ' + config.PORT))
}
start()
