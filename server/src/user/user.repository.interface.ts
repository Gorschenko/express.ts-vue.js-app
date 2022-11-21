import { User } from './user.entity'

export interface IUserRepository {
  create: (user: User) => Promise<boolean>
  find: (email: string) => Promise<User | null>
}
