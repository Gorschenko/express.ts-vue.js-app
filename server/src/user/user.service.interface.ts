import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";

export interface IUSerService {
  createUser: (dto: UserRegisterDto) => Promise<void>
  validateUser: (dto: UserLoginDto) => Promise<boolean>
}