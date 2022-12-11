import { Response, Request, NextFunction } from 'express'

export interface ICartController {
  fetch: (req: Request, res: Response, next: NextFunction) => Promise<void>
  add: (req: Request, res: Response, next: NextFunction) => Promise<void>
  // delete: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
