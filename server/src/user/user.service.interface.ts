import { IUserCart } from '../interfaces/user-cart.interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'

export interface IUSerService {
  createUser: (dto: UserRegisterDto) => Promise<boolean | null>
  validateUser: (dto: UserLoginDto) => Promise<boolean>
  getUserInfo: (email: string) => Promise<User | null>
  addCourse: (email: string, courseId: string) => Promise<User | null>
  deleteCourse: (email: string, courseId: string) => Promise<User | null>
  getCart: (email: string) => Promise<IUserCart | []>
  updateFavorites: (email: string, type: string, courseId: string) => Promise<User | null>
}
