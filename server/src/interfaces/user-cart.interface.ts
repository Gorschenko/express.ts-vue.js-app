import { Schema } from 'mongoose'

export interface IUserCart {
  items?: IUserCartItem[]
}

export interface IUserCartItem {
  count: number
  _id: Schema.Types.ObjectId | string
}
