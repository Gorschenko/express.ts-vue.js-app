// В Сервисе только бизнес логика
import { inject, injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.interface";
import { IUSerService } from "./user.service.interface";

@injectable()
export class UserService implements IUSerService{
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    ) {}
  async createUser({ email, password, name}: UserRegisterDto): Promise<void> {
    const newUser = new User(email, name)
    const salt = this.configService.get('SALT')
    await newUser.setPassword(password, Number(salt))
    return this.userRepository.create(newUser)
  }

  async validateUser (dto: UserLoginDto): Promise<boolean> {
    return true
  }
}