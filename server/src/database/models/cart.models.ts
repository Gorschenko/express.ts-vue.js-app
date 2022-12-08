import { model, Schema } from 'mongoose'
import { Cart } from '../../cart/cart.entity'

const cartSchema: Schema = new Schema<Cart>({
  items: [
    {
      count: {
        type: Number,
        required: true,
      },
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
    },
  ],
})

const CartModel = model<Cart>('Cart', cartSchema)

export default CartModel
