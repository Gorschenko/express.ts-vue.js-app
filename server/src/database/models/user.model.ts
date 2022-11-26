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
    items: [
      {
        count: {
          type: Number,
          required: true,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
      },
    ],
  },
})

const UserModel = model<User>('User', userSchema)

export default UserModel
