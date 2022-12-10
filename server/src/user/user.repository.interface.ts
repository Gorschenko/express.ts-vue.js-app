import { Model } from 'mongoose'
import { IUserModel } from '../interfaces/user-model.interface'
import { User } from './user.entity'

export interface IUserRepository {
  create: (user: User) => Promise<boolean>
  find: (email: string, populate?: string, hasPassword?: boolean) => Promise<IUserModel | null>
  update: (user: any) => Promise<User | null>
}
