import { Router, Response } from 'express'
import { ExpressReturnType, IControllerRoute } from './route.interface'
import { ILogger } from '../logger/logger.interface'
import { injectable } from 'inversify'
import 'reflect-metadata'

// Класс, от которого зависят другие, и если они injectable, то основной тоже должен быть injectable
@injectable()
export abstract class BaseController {
  private readonly _router: Router

  constructor(private logger: ILogger) {
    this._router = Router()
  }

  get router(): Router {
    return this._router
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('aplication/json')
    return res.status(code).json(message)
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send(res, 200, {
      ok: true,
      payload: message,
    })
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`)
      const middleware = route.middlewares?.map((m) => m.execute.bind(m))
      const handler = route.func.bind(this)
      const pipeline = middleware ? [...middleware, handler] : handler
      this.router[route.method](route.path, pipeline)
    }
  }
}
