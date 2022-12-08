import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IUserRepository } from '../user/user.repository.interface'
import { Cart } from './cart.entity'
import { ICartRepository } from './cart.repository.interface'
import { ICartService } from './cart.service.interface'

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.CartRepository) private cartRepository: ICartRepository,
  ) {}

  async add(email: string, courseId: string): Promise<boolean> {
    const user = await this.userRepository.find(email)
    if (user?.cart.items) {
      const cart = new Cart(user.cart.items, user.cart._id?.toString())
      cart.addItem(courseId)
      return true
    }
    return false
  }

  async delete(email: string, courseId: string): Promise<boolean> {
    const user = await this.userRepository.find(email)
    if (user?.cart.items) {
      const cart = new Cart(user.cart.items, user.cart._id?.toString())
      cart.deleteItem(courseId)
      return true
    }
    return false
  }

  async fetch(id: string): Promise<Cart | null> {
    return await this.cartRepository.fetch(id)
  }
}
