import { compare, hash } from 'bcryptjs'
export class User {
  private _password: string
  private _cart: any

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    hashPassword?: string,
  ) {
    if (hashPassword) {
      this._password = hashPassword
    }
    this._cart = {
      items: [],
    }
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
  get cart(): any {
    return this._cart
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt)
  }
  public async comparePasswrod(pass: string): Promise<boolean> {
    return compare(pass, this._password)
  }
}
