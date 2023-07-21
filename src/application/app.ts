import { services, adapters } from 'src/infrastructure/driven-adapters/providers'
import { controllers } from 'src/infrastructure/entry-points'
import { Module } from '@nestjs/common'

@Module({
  controllers: [...controllers],
  providers: [...services, ...adapters],
})
export class AppContainer {}
