import { inject, injectable } from "inversify";
import mongoose, { Mongoose } from 'mongoose'
import { IConfigService } from "../config/config.service.interface";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class MongoService {
  client: Mongoose

  constructor (
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.client = mongoose
  }

  async connect() {
    try {
      await this.client.connect(this.configService.get('MONGODB_URI'))
      this.logger.log('[MongoService] Успешно подключились к базе данных')
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log('[MongoService] Ошибка подключения к базе данных: ' + e.message)
      }
    }
  }

  async disconnect () {
    await this.client.disconnect()
  }
}