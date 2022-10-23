import { inject, injectable } from "inversify";
import mongoose from 'mongoose'
import { IConfigService } from "../config/config.service.interface";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class MongoService {
  client

  constructor (
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.client = mongoose
  }

  async connect() {
    try {
      await this.client.connect('mongodb+srv://Gorschenko:uf7tBtVud0ef30Gk@cluster0.ynpkt15.mongodb.net/shop_two')
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