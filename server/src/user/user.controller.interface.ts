import { Response, Request, NextFunction } from 'express'
export interface IUserController {
  info: (req: Request, res: Response, next: NextFunction) => Promise<void>
  updateLabels: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
