import { User } from "./user.entity";
import { Document } from "mongoose";

export interface IUserRepository {
  create: (user: User) => Promise<void>
  find: (email: string) => Promise<void | null>
}