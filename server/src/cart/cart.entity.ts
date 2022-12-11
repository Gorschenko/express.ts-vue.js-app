import { ObjectId, Schema } from 'mongoose'

export interface ICartItem {
  count: number
  _id: Schema.Types.ObjectId
}

export class Cart {
  _id: Schema.Types.ObjectId
  items: ICartItem[]

  constructor(cart: Cart) {
    this._id = cart._id
    this.items = cart.items
  }

  add(courseId: string): void {
    if (this.items.length) {
      const isAddedCourse = this.items.some((i) => i._id.toString() === courseId)
      if (isAddedCourse) {
        this.items = this.items.map((i) => {
          if (i._id.toString() === courseId) {
            i.count = i.count + 1
          }
          return i
        })
        return
      }
    }
    this.items.push({
      _id: courseId as unknown as ObjectId,
      count: 1,
    })
  }
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
