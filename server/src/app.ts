import express, { Express } from 'express'
import * as path from 'path'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service'
import { UserController } from './user/user.controller'

export class App {
  app: Express
  PORT: number
  server: Server
  logger: LoggerService
  userController: UserController

  constructor(
    logger: LoggerService,
    userController: UserController
  ) {
    this.app = express()
    this.PORT = 8000
    this.logger = logger
    this.userController = userController
  }

  useRoutes () {
    this.app.use('/auth', this.userController.router)
  }

  public async init() {  

    this.app.use(express.static(path.join(__dirname, '../../client/dist')))
    this.app.use(express.json())
    this.useRoutes()

    this.app.use((req, res, next) => {
      res.sendFile('index.html')
    })

    this.server = this.app.listen(this.PORT)
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`)
  }
}