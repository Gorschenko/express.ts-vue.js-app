import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata'
import { IUserController } from "./user.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor (@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/login', method: 'post', func: this.login,
      }
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    // console.log(req.body)
    // this.ok(res, req.params)
    next(new HTTPError(401, 'Ошибка авторизации', 'login'))
  }
}