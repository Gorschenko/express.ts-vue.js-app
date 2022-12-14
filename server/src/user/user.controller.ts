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
          path: '/',
          method: 'get',
          func: this.info,
          middlewares: [new AuthGuard()],
        },
        {
          path: '/labels/:type/:id',
          method: 'post',
          func: this.updateLabels,
          middlewares: [new AuthGuard()],
        },
      ],
      '/user',
    )
  }

  // +
  async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userInfo = await this.userService.getUserInfo(req.user.email)
    this.ok(res, userInfo)
  }

  async updateLabels(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.updateLabels(
      req.user.email,
      req.params.type,
      req.params.id,
    )
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'labels'))
    }
    this.ok(res, result)
  }
}
