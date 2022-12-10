import { Model } from 'mongoose'
import { Cart } from '../cart/cart.entity'
import { IUserModel } from '../interfaces/user-model.interface'
import { User } from './user.entity'

export interface IUserRepository {
  create: (user: User) => Promise<boolean>
  find: (email: string, populate?: string, hasPassword?: boolean) => Promise<User | null>
  update: (user: any) => Promise<User | null>
}
