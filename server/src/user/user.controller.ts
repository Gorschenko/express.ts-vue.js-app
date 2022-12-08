// Контроллер отвечает за то, что мы преобразуем, получаем и передаем в бизнес, и то что получаем и передаем от бизнеса
import { Response, Request, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import 'reflect-metadata'
import { IUserController } from './user.controller.interface'
import { IUSerService } from './user.service.interface'
import { IConfigService } from '../config/config.service.interface'
import { AuthGuard } from '../common/auth.guard'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUSerService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService)
    this.bindRoutes(
      [
        {
          path: '/info',
          method: 'get',
          func: this.info,
          middlewares: [new AuthGuard()],
        },
        {
          path: '/cart/:id',
          method: 'post',
          func: this.addCourse,
          middlewares: [new AuthGuard()],
        },
        {
          path: '/cart/:id',
          method: 'delete',
          func: this.deleteCourse,
          middlewares: [new AuthGuard()],
        },
        // {
        //   path: '/cart',
        //   method: 'get',
        //   func: this.fetchCart,
        //   middlewares: [new AuthGuard()],
        // },
        {
          path: '/favorites/:type/:id',
          method: 'post',
          func: this.updateFavorites,
          middlewares: [new AuthGuard()],
        },
      ],
      '/auth',
    )
  }

  async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userInfo = await this.userService.getUserInfo(req.user.email)
    this.ok(res, userInfo)
  }

  async addCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.addCourse(req.user.email, req.params.id)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'add-course'))
    }
    this.ok(res, result)
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.deleteCourse(req.user.email, req.params.id)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'delete-course'))
    }
    this.ok(res, result)
  }

  // async fetchCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   const result = await this.userService.getCart(req.user.email)
  //   if (!result) {
  //     return next(new HTTPError(400, 'Ошибка', 'fetch-cart'))
  //   }
  //   this.ok(res, result)
  // }

  async updateFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.updateFavorites(
      req.user.email,
      req.params.type,
      req.params.id,
    )
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'favorites'))
    }
    this.ok(res, result)
  }
}
