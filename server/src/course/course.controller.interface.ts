import { Response, Request, NextFunction } from 'express'
import { Course } from './course.entity'

export interface ICourseController {
  fetch(req: Request, res: Response, next: NextFunction): Promise<void>
  add(req: Request, res: Response, next: NextFunction): Promise<boolean>
}