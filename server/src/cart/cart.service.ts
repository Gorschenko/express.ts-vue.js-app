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
    if (user) {
      const cart = await this.cartRepository.find(user._id.toString())
      if (cart) {
        return true
      } else {
        const item = {
          _id: courseId,
          count: 1,
        }
        const cart = new Cart(user._id.toString(), item)
        const newCart = await this.cartRepository.create(cart)
        console.log(newCart)
        return true
      }
    }
    return false
  }

  // async delete(email: string, courseId: string): Promise<boolean> {
  //   const user = await this.userRepository.find(email)
  //   if (user?.cart.items) {
  //     const cart = new Cart(user.cart.items, user.cart._id?.toString())
  //     cart.deleteItem(courseId)
  //     return true
  //   }
  //   return false
  // }

  async get(email: string): Promise<Cart | null> {
    const user = await this.userRepository.find(email)
    if (user) {
      return await this.cartRepository.find(user._id.toString())
    }
    return null
  }
}
