import { User } from './user.entity'

export interface IUserRepository {
  create: (user: User) => Promise<boolean>
  find: (email: string, hasPassword?: boolean) => Promise<User | null>
}
