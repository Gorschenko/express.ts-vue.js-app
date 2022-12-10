// import { Response, Request, NextFunction } from 'express'
// import { inject, injectable } from 'inversify'
// import { AuthGuard } from '../common/auth.guard'
// import { BaseController } from '../common/base.controller'
// import { HTTPError } from '../errors/http-error.class'
// import { ILogger } from '../logger/logger.interface'
// import { TYPES } from '../types'
// import { ICartController } from './cart.controller.interface'
// import { CartService } from './cart.service'
// import { ICartService } from './cart.service.interface'

// @injectable()
// export class CartController extends BaseController implements ICartController {
//   constructor(
//     @inject(TYPES.ILogger) private loggerService: ILogger,
//     @inject(TYPES.CartService) private cartService: CartService,
//   ) {
//     super(loggerService)
//     this.bindRoutes(
//       [
// {
//   path: '/:id',
//   method: 'post',
//   func: this.add,
//   middlewares: [new AuthGuard()],
// },
// {
//   path: '/:id',
//   method: 'delete',
//   func: this.delete,
//   middlewares: [new AuthGuard()],
// },
// {
//   path: '/',
//   method: 'get',
//   func: this.get,
//   middlewares: [new AuthGuard()],
// },
//     ],
//     '/cart',
//   )
// }

// async add(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const result = await this.cartService.add(req.user.email, req.params.id)
//   if (!result) {
//     return next(new HTTPError(400, 'Ошибка', 'add-course'))
//   }
//   this.ok(res, result)
// }

// async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const result = await this.cartService.delete(req.user.email, req.params.id)
//   if (!result) {
//     return next(new HTTPError(400, 'Ошибка', 'delete-course'))
//   }
//   this.ok(res, result)
// }

// async get(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const result = await this.cartService.get(req.user.email)
//   if (!result) {
//     return next(new HTTPError(400, 'Ошибка', 'get-cart'))
//   }
//   this.ok(res, result)
// }
// }
