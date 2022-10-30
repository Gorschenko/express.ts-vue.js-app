import { inject, injectable } from 'inversify'
import { MongoService } from '../database/mongo.service'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUserRepository } from './user.repository.interface'
import UserModel from '../database/models/user.model'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.MongoService) private mongoService: MongoService) {}
  async create(user: User): Promise<User> {
    const newUser = new UserModel({ ...user })
    return await newUser.save()
  }
  async find(email: string): Promise<User | null> {
    return await UserModel.findOne({ email })
  }
}
