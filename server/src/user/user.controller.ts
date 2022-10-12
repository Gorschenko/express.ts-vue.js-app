import { Response, Request, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  constructor (
    logger: LoggerService
  ) {
    super(logger)
    this.bindRoutes([
      {
        path: '/login', method: 'post', func: this.login,
      }
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    this.ok(res, req.params)
  }
}