import { Response, Request, NextFunction } from 'express'
import { Course } from './course.entity'

export interface ICourseController {
  fetch(req: Request, res: Response, next: NextFunction): Promise<void>
  create(req: Request, res: Response, next: NextFunction): Promise<void>
  delete(req: Request, res: Response, next: NextFunction): Promise<void>
  edit(req: Request, res: Response, next: NextFunction): Promise<void>
}
