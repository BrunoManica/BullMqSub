import { Injectable } from '@nestjs/common'
import { IMongoService } from '../mongo.service.interface'

@Injectable()
export class MongoService implements IMongoService {
  constructor() {}
}
