import { Response, Request, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { ICourseController } from './course.controller.interface'
import { ICourseService } from './course.service.interface'
import { CourseCreateDto } from './dto/course-create.dto'

@injectable()
export class CourseController extends BaseController implements ICourseController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.CourseService) private courseService: ICourseService,
  ) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.fetch,
        middlewares: [],
      },
      {
        path: '/',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(CourseCreateDto)],
      },
      {
        path: '/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [],
      },
    ])
  }
  async fetch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.courseService.fetch()
    this.ok(res, result)
  }

  async create(
    req: Request<{}, {}, CourseCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.courseService.create(req.body)
    this.ok(res, result)
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.courseService.delete(req.params.id)
    this.ok(res, { result })
  }
}
