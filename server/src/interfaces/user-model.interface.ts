import { Schema } from 'mongoose'
import { User } from '../user/user.entity'

export interface IUserModel extends User {
  _id: Schema.Types.ObjectId
}
