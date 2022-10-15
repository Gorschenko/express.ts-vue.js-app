
import { Container, ContainerModule, interfaces } from "inversify"
import { App } from "./app"
import { ExeptionFilter } from "./errors/exeption.filter"
import { IExeptionFilter } from "./errors/exeption.filters.interface"
import { ILogger } from "./logger/logger.interface"
import { LoggerService } from "./logger/logger.service"
import { TYPES } from "./types"
import { UserController } from "./user/user.controller"
import { IUserController } from "./user/user.controller.interface"
import { UserService } from "./user/user.service"
import { IUSerService } from "./user/user.service.interface"

// Положили в контейнер информации о том, что для ILogger будет соответствовать LoggerService
// Если мы будем делать inject по token = TYPES.ILogger, то мы должны взять инстанс LoggerService и положить туда
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
  bind<IUserController>(TYPES.UserController).to(UserController)
  bind<IUSerService>(TYPES.UserService).to(UserService)
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

export const { app, appContainer } = bootstrap()