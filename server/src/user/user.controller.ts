// Контроллер отвечает за то, что мы преобразуем, получаем и передаем в бизнес, и то что получаем и передаем от бизнеса
import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata'
import { IUserController } from "./user.controller.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUSerService } from "./user.service.interface";
import { ValidateMiddleware } from "../common/validate.middleware";
import { IConfigService } from "../config/config.service.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor (
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUSerService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)]
      },
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)]
      }
    ])
  }

  async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.validateUser(req.body)
    if (!result) {
      return next(new HTTPError(401, 'Ошибка авторизации', 'login'))
    }
    this.ok(res, {})
  }


  async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.createUser(req.body)
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'))
    }
    this.ok(res, { result })
  }
}