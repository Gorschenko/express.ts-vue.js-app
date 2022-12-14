// В Сервисе только бизнес логика
import { inject, injectable } from 'inversify'
import { ObjectId } from 'mongoose'
import { AuthLoginDto } from '../auth/dto/auth-login.dto'
import { AuthRegisterDto } from '../auth/dto/auth-register.dto'
import { ICartRepository } from '../cart/cart.repository.interface'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUserRepository } from './user.repository.interface'
import { IUSerService } from './user.service.interface'

@injectable()
export class UserService implements IUSerService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.CartRepository) private cartRepository: ICartRepository,
  ) {}
  // +
  async createUser({ email, password, name }: AuthRegisterDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(email)
    if (existedUser) {
      return false
    }

    const newCart = await this.cartRepository.create()
    if (!newCart) {
      return false
    }
    const newUser = new User(email, name, '')
    newUser.setCart(newCart)
    const salt = this.configService.get('SALT')
    await newUser.setPassword(password, Number(salt))
    const createdUser = await this.userRepository.create(newUser)
    if (!createdUser) {
      return false
    }
    return true
  }
  // +
  async validateUser(body: AuthLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(body.email, '', true)
    if (!existedUser) {
      return false
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password)
    return newUser.comparePasswrod(body.password)
  }
  // +
  async getUserInfo(email: string): Promise<User | null> {
    return this.userRepository.find(email, 'cart._id')
  }

  async updateLabels(email: string, type: string, courseId: string): Promise<User | null> {
    const user = await this.userRepository.find(email, 'cart._id')
    if (user) {
      const favorites = user.labels[type]
      const hasItem = favorites.find((i) => i.toString() === courseId)
      const result = hasItem
        ? favorites.filter((i) => i.toString() !== courseId)
        : favorites.concat(courseId as unknown as ObjectId)
      user.labels[type] = result
      return await this.userRepository.update(user, 'cart._id')
    }
    return null
  }
}
