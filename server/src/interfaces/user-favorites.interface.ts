import { Schema } from 'mongoose'

export interface IUserFavorites {
  [key: string]: Schema.Types.ObjectId[]
}
