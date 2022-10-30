import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { ICourseController } from "./course.controller.interface";


@injectable()
export class CourseController extends BaseController implements ICourseController {
  constructor (
    @inject(TYPES.ILogger) private loggerService: ILogger,
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
        func: this.add,
        middlewares: [],
      }
    ])
  }
  async fetch(): Promise<void> {
    console.log('working 1')
    return
  }
  async add (): Promise<boolean> {
    console.log('working 2')
    return true
  }
}