import express, { Express } from 'express'
import * as path from 'path'
import { Server } from 'http'
import { userRouter } from './users/users'

export class App {
  app: Express
  PORT: number
  server: Server

  constructor() {
    this.app = express()
    this.PORT = 8000
  }

  useRoutes () {
    this.app.use('/auth', userRouter)
  }

  public async init() {
    this.useRoutes()

    this.app.use(express.static(path.join(__dirname, '../client/dist')))
    this.app.use(express.json())
    this.app.use((req, res, next) => {
      res.sendFile('index.html')
    })

    this.server = this.app.listen(this.PORT)
    console.log(`Сервер запущен на http://localhost:${this.PORT}`)
  }
}