// import { App } from './app'
// import { ExeptionFilter } from './errors/exeption.filter'
// import { LoggerService } from './logger/logger.service'
// import { UserController } from './user/user.controller'

// const bootstrap = async() => {
//   const logger = new LoggerService()
//   const app = new App(
//     logger,
//     new UserController(logger),
//     new ExeptionFilter(logger),
//   )
//   await app.init()
// }

// bootstrap()

import { Container, ContainerModule, interfaces } from "inversify"
import { App } from "./app"
import { ExeptionFilter } from "./errors/exeption.filter"
import { IExeptionFilter } from "./errors/exeption.filters.interface"
import { ILogger } from "./logger/logger.interface"
import { LoggerService } from "./logger/logger.service"
import { TYPES } from "./types"
import { UserController } from "./user/user.controller"

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
  bind<UserController>(TYPES.UserController).to(UserController)
  bind<App>(TYPES.Application).to(App)
})

const bootstrap = () => {
  const appContainer = new Container()
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()
  return {
    app,
    appContainer
  }
}



// Положили в контейнер информации о том, что для ILogger будет соответствовать LoggerService
// Если мы будем делать inject по token = TYPES.ILogger, то мы должны взять инстанс LoggerService и положить туда



export const { app, appContainer } = bootstrap()