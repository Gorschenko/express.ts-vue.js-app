import { Types } from 'mongoose'
import CartModel from '../database/models/cart.models'
import { Cart } from './cart.entity'

export interface ICartRepository {
  // update: (cart: Cart, populate?: string) => Promise<Cart | null>
  find: (id: string) => Promise<Cart | null>
  create: () => Promise<Cart | null>
}
