import { Cart } from './cart.entity'

export interface ICartService {
  fetch: (cartId: string) => Promise<Cart[] | null>
  add: (cartId: string, courseId: string) => Promise<boolean>
  // delete: (email: string, courseId: string) => Promise<boolean>
}
