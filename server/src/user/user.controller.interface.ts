import { Response, Request, NextFunction } from 'express'
export interface IUserController {
  info: (req: Request, res: Response, next: NextFunction) => Promise<void>
  // updateFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
