// В Сервисе только бизнес логика
import { injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUSerService } from "./user.service.interface";

@injectable()
export class UserService implements IUSerService{
  async createUser({ email, password, name}: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name)
    await newUser.setPassword(password)
    return null
  }

  async validateUser (dto: UserLoginDto): Promise<boolean> {
    return true
  }
}