import { compare, hash } from 'bcryptjs'
import { IUserCart } from '../interfaces/user-cart.interface'
export class User {
  private _password: string
  private _cart: IUserCart

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    hashPassword?: string,
  ) {
    if (hashPassword) {
      this._password = hashPassword
    }
    this._cart = {}
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
  get cart(): IUserCart {
    return this._cart
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt)
  }
  public async comparePasswrod(pass: string): Promise<boolean> {
    return compare(pass, this._password)
  }
}
