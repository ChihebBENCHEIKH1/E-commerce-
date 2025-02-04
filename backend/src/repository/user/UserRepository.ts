import bcrypt from "bcryptjs";
import { injectable } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { UserModel } from "../../models/user/User";
import { IUser } from "../../models/user/IUser";
import { SALT_ROUNDS } from "../../config/env";

@injectable()
export class UserRepository implements IUserRepository {
  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    country: number;
    otpSecret: string;
    otpExpiry: Date;
  }): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async findUserByOtpSecret(otpSecret: string): Promise<IUser | null> {
    return await UserModel.findOne({ otpSecret });
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  async verifyOtp(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });

    if (!user || !user.otpSecret) {
      throw new Error("User not found or OTP secret missing");
    }

    user.otpVerified = true;
    await user.save();
    return user;
  }

  async updatePassword(userId: string, password: string): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
  }
}
