import { Response, Request, NextFunction } from 'express'

export interface ICartController {
  add: (req: Request, res: Response, next: NextFunction) => Promise<void>
  delete: (req: Request, res: Response, next: NextFunction) => Promise<void>
  // fetch: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
