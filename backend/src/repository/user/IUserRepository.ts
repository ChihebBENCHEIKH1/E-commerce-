import { IUser } from "../../models/user/IUser";

export interface IUserRepository {
  createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    country: number;
    otpSecret: string;
    otpExpiry: Date;
  }): Promise<IUser>;

  findUserByEmail(email: string): Promise<IUser | null>;

  findUserByOtpSecret(otpSecret: string): Promise<IUser | null>;

  findUserById(userId: string): Promise<IUser | null>;

  verifyOtp(email: string): Promise<IUser | null>;

  updatePassword(userId: string, password: string): Promise<IUser>;
}
