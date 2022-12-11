import { compare, hash } from 'bcryptjs'
import { Cart } from '../cart/cart.entity'

export class User {
  password: string
  cart: Cart

  constructor(public email: string, public name: string, hashPassword?: string) {
    if (hashPassword) {
      this.password = hashPassword
    }
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this.password = await hash(pass, salt)
  }

  public async comparePasswrod(pass: string): Promise<boolean> {
    return compare(pass, this.password)
  }

  public setCart(cart: Cart): void {
    this.cart = cart
  }
}
