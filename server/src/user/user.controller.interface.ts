import { Response, Request, NextFunction } from 'express'
export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>
  register: (req: Request, res: Response, next: NextFunction) => Promise<void>
  info: (req: Request, res: Response, next: NextFunction) => Promise<void>
  addCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>
  deleteCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>
  fetchCart: (req: Request, res: Response, next: NextFunction) => Promise<void>
  updateFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
