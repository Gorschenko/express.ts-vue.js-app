import { Cart } from './cart.entity'

export interface ICartRepository {
  // update: (cart: Cart, populate?: string) => Promise<Cart | null>
  find: (id: string) => Promise<Cart | null>
  create: (cart: Cart) => Promise<Cart | null>
}
