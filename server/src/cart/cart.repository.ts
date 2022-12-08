import { inject, injectable } from 'inversify'
import CartModel from '../database/models/cart.models'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { Cart } from './cart.entity'
import { ICartRepository } from './cart.repository.interface'

@injectable()
export class CartRepository implements ICartRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}

  async update(cart: Cart, populate = ''): Promise<Cart | null> {
    return await CartModel.findByIdAndUpdate(cart._id, cart, {
      new: true,
    }).populate(populate)
  }

  async fetch(id: string, populate = ''): Promise<Cart | null> {
    return await CartModel.findOne({ id }).populate(populate)
  }
}
