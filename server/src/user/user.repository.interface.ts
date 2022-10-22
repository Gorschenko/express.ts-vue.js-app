import { User } from "./user.entity";
import UserModel from '../database/models/user.model'

export interface IUserRepository {
  create: (user: User) => Promise<void>
  find: (email: string) => Promise<void | null>
}