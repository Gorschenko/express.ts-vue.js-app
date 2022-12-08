import { Schema, model } from 'mongoose'
import { User } from '../../user/user.entity'

const userSchema: Schema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
  },
  favorites: {
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
})

const UserModel = model<User>('User', userSchema)

export default UserModel
