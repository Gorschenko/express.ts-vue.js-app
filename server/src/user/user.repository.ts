import { inject, injectable } from 'inversify'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUserRepository } from './user.repository.interface'
import UserModel from '../database/models/user.model'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  async create(user: User): Promise<boolean> {
    const newUser = new UserModel({ email: user.email, name: user.name, password: user.password })
    await newUser.save()
    return true
  }
  async find(email: string, populate = '', hasPassword = false): Promise<User | null> {
    if (hasPassword) {
      return await UserModel.findOne({ email })
    } else {
      return await UserModel.findOne({ email }, '-password')
    }
  }
  async update(user: any): Promise<User | null> {
    const result = await UserModel.findByIdAndUpdate(user._id, user, { new: true }).populate(
      'cart.items._id',
    )
    return result
  }
}
