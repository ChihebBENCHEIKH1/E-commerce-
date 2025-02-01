import { IUser } from "../../models/user/IUser";

export interface IUserRepository {
  createUser(userData: { username: string; password: string }): Promise<IUser>;
  findUserByUsername(username: string): Promise<IUser | null>;
}
