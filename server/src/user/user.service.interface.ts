import { AuthLoginDto } from '../auth/dto/auth-login.dto'
import { AuthRegisterDto } from '../auth/dto/auth-register.dto'
import { IUserCart } from '../interfaces/user-cart.interface'
import { User } from './user.entity'

export interface IUSerService {
  createUser: (dto: AuthRegisterDto) => Promise<boolean>
  validateUser: (dto: AuthLoginDto) => Promise<boolean>
  getUserInfo: (email: string) => Promise<User | null>
  addCourse: (email: string, courseId: string) => Promise<User | null>
  deleteCourse: (email: string, courseId: string) => Promise<User | null>
  // getCart: (email: string) => Promise<IUserCart | []>
  // updateFavorites: (email: string, type: string, courseId: string) => Promise<User | null>
}
