import { Response, Request, NextFunction } from 'express'
export interface IAuthController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>
  register: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
