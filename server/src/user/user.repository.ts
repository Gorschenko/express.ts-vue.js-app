import { inject, injectable } from 'inversify'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUserRepository } from './user.repository.interface'
import UserModel from '../database/models/user.model'
import { IUserModel } from '../interfaces/user-model.interface'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  // +
  async create(user: User): Promise<User | null> {
    const newUser = new UserModel({
      email: user.email,
      name: user.name,
      password: user.password,
      cart: user.cart,
    })
    return await newUser.save()
  }
  // +
  async find(email: string, populate = '', hasPassword = false): Promise<User | null> {
    if (hasPassword) {
      return await UserModel.findOne({ email }).populate(populate)
    } else {
      return await UserModel.findOne({ email }, '-password').populate(populate)
    }
  }

  async update(user: IUserModel, populate = ''): Promise<User | null> {
    const result = await UserModel.findByIdAndUpdate(user._id, user, {
      new: true,
      fields: '-password',
    }).populate(populate)
    return result
  }
}
