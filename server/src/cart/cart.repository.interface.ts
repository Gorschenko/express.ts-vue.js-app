import { Cart } from './cart.entity'

export interface ICartRepository {
  update: (cart: Cart, populate?: string) => Promise<Cart | null>
  fetch: (id: string, populate?: string) => Promise<Cart | null>
}
