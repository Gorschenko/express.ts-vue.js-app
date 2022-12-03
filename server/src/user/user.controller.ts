// Контроллер отвечает за то, что мы преобразуем, получаем и передаем в бизнес, и то что получаем и передаем от бизнеса
import { Response, Request, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import 'reflect-metadata'
import { IUserController } from './user.controller.interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { IUSerService } from './user.service.interface'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IConfigService } from '../config/config.service.interface'
import { sign } from 'jsonwebtoken'
import { AuthGuard } from '../common/auth.guard'
import { CourseEditDto } from '../course/dto/course-edit.dto'

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
          path: '/login',
          method: 'post',
          func: this.login,
          middlewares: [new ValidateMiddleware(UserLoginDto)],
        },
        {
          path: '/register',
          method: 'post',
          func: this.register,
          middlewares: [new ValidateMiddleware(UserRegisterDto)],
        },
        {
          path: '/info',
          method: 'get',
          func: this.info,
          middlewares: [new AuthGuard()],
        },
        {
          path: '/add-course/:id',
          method: 'post',
          func: this.addCourse,
          middlewares: [new AuthGuard()],
        },
      ],
      '/auth',
    )
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(req.body)
    if (!result) {
      return next(new HTTPError(401, 'Ошибка авторизации', 'login'))
    }
    const token = await this.signJWT(req.body.email, this.configService.get('SECRET'))
    this.ok(res, { token })
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => (err ? reject(err) : resolve(token as string)),
      )
    })
  }

  async register(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(req.body)
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'))
    }
    this.ok(res, result)
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
}
