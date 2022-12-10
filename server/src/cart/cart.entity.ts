import { Schema, Types } from 'mongoose'

export interface IUserCartItem {
  count: number
  _id: Schema.Types.ObjectId | string
}

export class Cart {
  user: object
  items: IUserCartItem[]

  constructor(public readonly _id: Schema.Types.ObjectId, items: IUserCartItem) {}
  // addItem(courseId: string): void {
  //   if (this.items.length) {
  //     const isAddedCourse = this.items.some(
  //       (i: IUserCartItem) => i._id.toString() === courseId.toString(),
  //     )
  //     if (isAddedCourse) {
  //       this.items = this.items.map((i: IUserCartItem) => {
  //         if (i._id.toString() === courseId.toString()) {
  //           i.count = i.count + 1
  //         }
  //         return i
  //       })
  //     } else {
  //       this.items.push({
  //         _id: courseId,
  //         count: 1,
  //       })
  //     }
  //   } else {
  //     this.items = [
  //       {
  //         _id: courseId,
  //         count: 1,
  //       },
  //     ]
  //   }
  // }
  // deleteItem(courseId: string): void {
  //   this.items = this.items
  //     .map((i: IUserCartItem) => {
  //       if (i._id.toString() === courseId.toString()) {
  //         i.count = i.count - 1
  //       }
  //       return i
  //     })
  //     .filter((i: IUserCartItem) => i.count !== 0)
  // }
}
