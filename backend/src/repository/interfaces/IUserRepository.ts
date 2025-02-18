import { IUser } from "../../models/interfaces/IUser";

export interface IUserRepository {
  create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    country: number;
    otpSecret: string;
    otpExpiry: Date;
    role: string;
    password?: string;
  }): Promise<IUser>;

  findUserByEmail(email: string): Promise<IUser | null>;

  findUserByOtpSecret(otpSecret: string): Promise<IUser | null>;

  findUserById(userId: string): Promise<IUser | null>;

  verifyOtp(email: string, otp: string): Promise<IUser | null>;

  updatePassword(userId: string, newPassword: string): Promise<IUser>;

  updateResetPasswordToken(
    email: string,
    resetPasswordToken: string,
    resetPasswordExpires: Date
  ): Promise<IUser | null>;

  clearResetPasswordToken(userId: string): Promise<IUser | null>;

  activateUser(userId: string): Promise<IUser | null>;

  deactivateUser(userId: string): Promise<IUser | null>;

  deleteUser(userId: string): Promise<boolean>;
  findUserByResetPasswordToken(token: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}
