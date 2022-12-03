// В Сервисе только бизнес логика
import e from 'express'
import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { IUserCartItem } from '../interfaces/user-cart.interface'
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
    const existedUser = await this.userRepository.find(body.email, '', true)
    if (!existedUser) {
      return false
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password)
    return newUser.comparePasswrod(body.password)
  }

  async getUserInfo(email: string): Promise<User | null> {
    return this.userRepository.find(email)
  }

  async addCourse(email: string, courseId: string): Promise<User | null> {
    const user = await this.userRepository.find(email)
    if (user) {
      if (user.cart.items) {
        const idx = user.cart.items.findIndex(
          (i: IUserCartItem) => i._id.toString() === courseId.toString(),
        )
        if (idx >= 0) {
          user.cart.items[idx].count = user.cart.items[idx].count + 1
        } else {
          user.cart.items.push({
            _id: courseId,
            count: 1,
          })
        }
      } else {
        user.cart.items = [
          {
            _id: courseId,
            count: 1,
          },
        ]
      }
      return await this.userRepository.update(user)
    }
    return null
  }

  async deleteCourse(email: string, courseId: string): Promise<User | null> {
    const user = await this.userRepository.find(email)
    if (user) {
      const updatedItems = user.cart.items
        ?.map((i) => {
          if (i._id.toString() === courseId.toString()) {
            i.count = i.count - 1
          }
          return i
        })
        .filter((i) => i.count !== 0)
      user.cart.items = updatedItems
      return await this.userRepository.update(user)
    }
    return null
  }
}
