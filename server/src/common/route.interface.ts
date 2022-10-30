import { Request, Response, NextFunction, Router } from 'express'
import { IMiddleware } from './middleware.interface'

export interface IControllerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void
	// Берет из Router передаваемые значения и создает новый интерфейс
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	middlewares?: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>
