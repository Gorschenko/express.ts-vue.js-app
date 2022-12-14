import { Cart } from './cart.entity'

export interface ICartRepository {
  update: (cart: Cart, populate?: string) => Promise<Cart | null>
  find: (cartId: string) => Promise<Cart[]>
  create: () => Promise<Cart | null>
}
