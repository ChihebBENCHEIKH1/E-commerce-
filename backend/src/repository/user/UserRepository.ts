import { injectable } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { UserModel } from "../../models/user/User";
import { IUser } from "../../models/user/IUser";

@injectable()
export class UserRepository implements IUserRepository {
  async createUser(userData: {
    username: string;
    password: string;
  }): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    return await UserModel.findOne({ username });
  }
}
