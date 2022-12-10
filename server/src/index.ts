import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { AuthController } from './auth/auth.controller'
import { IAuthController } from './auth/auth.controller.interface'
// import { CartController } from './cart/cart.controller'
// import { ICartController } from './cart/cart.controller.interface'
import { CartRepository } from './cart/cart.repository'
import { ICartRepository } from './cart/cart.repository.interface'
// import { CartService } from './cart/cart.service'
// import { ICartService } from './cart/cart.service.interface'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { CourseController } from './course/course.controller'
import { ICourseController } from './course/course.controller.interface'
import { CourseRepository } from './course/course.repository'
import { ICourseRepository } from './course/course.repository.interface'
import { CourseService } from './course/course.service'
import { ICourseService } from './course/course.service.interface'
import { MongoService } from './database/mongo.service'
import { ExeptionFilter } from './errors/exeption.filter'
import { IExeptionFilter } from './errors/exeption.filters.interface'
import { ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { UserController } from './user/user.controller'
import { IUserController } from './user/user.controller.interface'
import { UserRepository } from './user/user.repository'
import { IUserRepository } from './user/user.repository.interface'
import { UserService } from './user/user.service'
import { IUSerService } from './user/user.service.interface'

// Положили в контейнер информации о том, что для ILogger будет соответствовать LoggerService
// Если мы будем делать inject по token = TYPES.ILogger, то мы должны взять инстанс LoggerService и положить туда
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  // bind<ICartController>(TYPES.CartController).to(CartController)
  bind<IAuthController>(TYPES.AuthController).to(AuthController)
  bind<IUserController>(TYPES.UserController).to(UserController)
  bind<ICourseController>(TYPES.CourseController).to(CourseController)

  bind<IUSerService>(TYPES.UserService).to(UserService)
  bind<ICourseService>(TYPES.CourseService).to(CourseService)
  // bind<ICartService>(TYPES.CartService).to(CartService)

  bind<ICartRepository>(TYPES.CartRepository).to(CartRepository).inSingletonScope()
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope()
  bind<ICourseRepository>(TYPES.CourseRepository).to(CourseRepository).inSingletonScope()

  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope()
  bind<App>(TYPES.Application).to(App)
})

export interface IBootstrapReturn {
  appContainer: Container
  app: App
}

const bootstrap = (): IBootstrapReturn => {
  const appContainer = new Container()
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()
  return {
    app,
    appContainer,
  }
}

export const { app, appContainer } = bootstrap()
