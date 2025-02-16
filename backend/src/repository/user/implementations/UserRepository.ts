import bcrypt from "bcryptjs";
import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserModel } from "../../../models/User";
import { IUser } from "../../../models/interfaces/IUser";
import { SALT_ROUNDS } from "../../../config/env";

@injectable()
export class UserRepository implements IUserRepository {
  updateResetPasswordToken(
    email: string,
    resetPasswordToken: string,
    resetPasswordExpires: Date
  ): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  clearResetPasswordToken(userId: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  activateUser(userId: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  deactivateUser(userId: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  deleteUser(userId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    country: number;
    otpSecret: string;
    otpExpiry: Date;
    role: string;
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
    user.otpSecret = "";
    user.otpExpiry = null;

    await user.save();
    return user;
  }

  async updatePassword(userId: string, password: string): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    if (!user.activated) {
      user.activated = true;
    }

    await user.save();
    return user;
  }

  async findUserByResetPasswordToken(token: string): Promise<IUser | null> {
    return await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }
}
