import express, { Express } from 'express'
import * as path from 'path'
import { Server } from 'http'
import { ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import 'reflect-metadata'
import { IExeptionFilter } from './errors/exeption.filters.interface'
import { IConfigService } from './config/config.service.interface'
import { UserController } from './user/user.controller'
import { MongoService } from './database/mongo.service'

@injectable()
export class App {
  app: Express
  PORT: number
  server: Server

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.MongoService) private mongoService: MongoService
  ) {
    this.app = express()
    this.PORT = 8000
  }

  useMiddleware() {
    this.app.use(express.static(path.join(__dirname, '../../client/dist')))
    this.app.use(express.json())
  }

  useRoutes () {
    this.app.use('/auth', this.userController.router)
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init() {  
    this.useMiddleware()
    this.useRoutes()
    this.useExeptionFilters()

    this.app.use((req, res, next) => {
      res.sendFile('index.html')
    })
    await this.mongoService.connect()
    this.server = this.app.listen(this.PORT)
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`)
  }
}