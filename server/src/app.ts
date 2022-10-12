import express, { Express } from 'express'
import * as path from 'path'
import { Server } from 'http'
import { userRouter } from './users/users'
import { LoggerService } from './logger/logger.service'

export class App {
  app: Express
  PORT: number
  server: Server
  logger: LoggerService

  constructor(logger: LoggerService) {
    this.app = express()
    this.PORT = 8000
    this.logger = logger
  }

  useRoutes () {
    this.app.use('/auth', userRouter)
  }

  public async init() {
    this.useRoutes()

    this.app.use(express.static(path.join(__dirname, '../../client/dist')))
    this.app.use(express.json())

    this.app.use((req, res, next) => {
      res.sendFile('index.html')
    })

    this.server = this.app.listen(this.PORT)
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`)
  }
}