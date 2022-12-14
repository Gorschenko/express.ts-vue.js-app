import { Response, Request, NextFunction } from 'express'
import { BaseController } from '../common/base.controller'
import { inject, injectable } from 'inversify'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IAuthController } from './auth.controller.interface'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'
import { IUSerService } from '../user/user.service.interface'
import { HTTPError } from '../errors/http-error.class'
import { IConfigService } from '../config/config.service.interface'
import { sign } from 'jsonwebtoken'

@injectable()
export class AuthController extends BaseController implements IAuthController {
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
          middlewares: [new ValidateMiddleware(AuthLoginDto)],
        },
        {
          path: '/register',
          method: 'post',
          func: this.register,
          middlewares: [new ValidateMiddleware(AuthRegisterDto)],
        },
      ],
      '/auth',
    )
  }
  // +
  async login(
    req: Request<{}, {}, AuthLoginDto>,
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
  // +
  async register(
    req: Request<{}, {}, AuthRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(req.body)
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'))
    }
    this.ok(res, result)
  }
}
