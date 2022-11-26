// В Сервисе только бизнес логика
import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { Course } from '../course/course.entity'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'
import { IUserRepository } from './user.repository.interface'
import { IUSerService } from './user.service.interface'

@injectable()
export class UserService implements IUSerService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}
  async createUser({ email, password, name }: UserRegisterDto): Promise<boolean | null> {
    const newUser = new User(email, name)
    const salt = this.configService.get('SALT')
    await newUser.setPassword(password, Number(salt))
    const existedUser = await this.userRepository.find(email)
    if (existedUser) {
      return null
    }
    return this.userRepository.create(newUser)
  }

  async validateUser(body: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(body.email, true)
    if (!existedUser) {
      return false
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password)
    return newUser.comparePasswrod(body.password)
  }

  async getUserInfo(email: string): Promise<User | null> {
    return this.userRepository.find(email)
  }
  async addCourse(email: string, course: any): Promise<User | null> {
    const user = await this.userRepository.find(email)
    if (user) {
      const items = user.cart.items.slice()
      const idx = items.findIndex((i: any) => i.courseId.toString() === course._id.toString())
      if (idx >= 0) {
        items[idx].count = items[idx].count + 1
      } else {
        items.push({
          courseId: course._id,
          count: 1,
        })
      }
      user.cart.items = items
      return await this.userRepository.update(email, user)
    }
    return null
  }
}
