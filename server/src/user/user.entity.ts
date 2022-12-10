import { compare, hash } from 'bcryptjs'
import { Cart } from '../cart/cart.entity'
import { IUserCart } from '../interfaces/user-cart.interface'
import { IUserFavorites } from '../interfaces/user-favorites.interface'
export class User {
  private _password: string
  private _cart: Cart
  private _favorites: IUserFavorites

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    hashPassword?: string,
    cart?: Cart,
  ) {
    if (hashPassword) {
      this._password = hashPassword
    }
    if (cart) {
      this._cart = cart
    }
    this._favorites = {}
  }

  get email(): string {
    return this._email
  }

  get name(): string {
    return this._name
  }

  get password(): string {
    return this._password
  }

  get cart(): Cart {
    return this._cart
  }

  get favorites(): IUserFavorites {
    return this._favorites
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt)
  }
  public async comparePasswrod(pass: string): Promise<boolean> {
    return compare(pass, this._password)
  }
}
