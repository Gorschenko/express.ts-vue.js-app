import express, { Express } from 'express'
import * as path from 'path'
import { Server } from 'http'
import { UserController } from './user/user.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import 'reflect-metadata'

@injectable()
export class App {
  app: Express
  PORT: number
  server: Server

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
  ) {
    this.app = express()
    this.PORT = 8000
  }

  useRoutes () {
    this.app.use('/auth', this.userController.router)
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init() {  
    this.app.use(express.static(path.join(__dirname, '../../client/dist')))
    this.app.use(express.json())
    this.useRoutes()
    this.useExeptionFilters()

    this.app.use((req, res, next) => {
      res.sendFile('index.html')
    })

    this.server = this.app.listen(this.PORT)
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`)
  }
}