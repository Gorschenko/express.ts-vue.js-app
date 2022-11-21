import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'

export interface IUSerService {
  createUser: (dto: UserRegisterDto) => Promise<boolean | null>
  validateUser: (dto: UserLoginDto) => Promise<boolean>
  getUserInfo: (email: string) => Promise<User | null>
}
