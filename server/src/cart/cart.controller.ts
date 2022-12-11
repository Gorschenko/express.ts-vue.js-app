import { Response, Request, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { AuthGuard } from '../common/auth.guard'
import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { ICartController } from './cart.controller.interface'
import { ICartService } from './cart.service.interface'

@injectable()
export class CartController extends BaseController implements ICartController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.CartService) private cartService: ICartService,
  ) {
    super(loggerService)
    this.bindRoutes(
      [
        {
          path: '/:id',
          method: 'get',
          func: this.fetch,
          middlewares: [new AuthGuard()],
        },
        {
          path: '/:cartId/add/:courseId',
          method: 'post',
          func: this.add,
          middlewares: [new AuthGuard()],
        },
        // {
        //   path: '/:id',
        //   method: 'delete',
        //   func: this.delete,
        //   middlewares: [new AuthGuard()],
        // },
      ],
      '/cart',
    )
  }

  async fetch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.cartService.fetch(req.params.id)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'fetch'))
    }
    this.ok(res, result)
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.cartService.add(req.params.cartId, req.params.courseId)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'add-course'))
    }
    this.ok(res, result)
  }

  // async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   const result = await this.cartService.delete(req.params.cartId, req.params.courseId)
  //   if (!result) {
  //     return next(new HTTPError(400, 'Ошибка', 'delete-course'))
  //   }
  //   this.ok(res, result)
  // }
}
