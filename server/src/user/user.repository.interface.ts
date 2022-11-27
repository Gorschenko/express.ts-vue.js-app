import { User } from './user.entity'

export interface IUserRepository {
  create: (user: User) => Promise<boolean>
  find: (email: string, populate?: string, hasPassword?: boolean) => Promise<User | null>
  update: (user: any) => Promise<User | null>
}
