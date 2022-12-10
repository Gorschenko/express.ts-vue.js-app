import { inject, injectable } from 'inversify'
import { Types } from 'mongoose'
import CartModel from '../database/models/cart.models'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { Cart } from './cart.entity'
import { ICartRepository } from './cart.repository.interface'

@injectable()
export class CartRepository implements ICartRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}

  // async update(cart: Cart, populate = ''): Promise<Cart | null> {
  //   return await CartModel.findByIdAndUpdate(cart._id, cart, {
  //     new: true,
  //   }).populate(populate)
  // }

  async find(id: string): Promise<Cart | null> {
    return await CartModel.findOne({ id })
  }

  async create(): Promise<Cart | null> {
    const newCart = new CartModel()
    await newCart.save()
    return newCart
  }
}
