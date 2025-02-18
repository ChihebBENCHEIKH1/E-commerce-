import { RegisterDTO } from "../../dto/RegisterDTO";
import { IUser } from "../../models/interfaces/IUser";

export interface IAuthService {
  verifyCaptcha(captchaResponse: string): Promise<boolean>;
  register(data: RegisterDTO): Promise<void>;
  login(data: {
    email: string;
    password: string;
    recaptcha: string;
  }): Promise<{ token: string; refreshToken: string }>;
  verifyUserOTP(data: { userEmail: string; otp: string }): Promise<void>;
  updatePassword(token: string, newPassword: string): Promise<void>;
  refreshToken(
    refreshToken: string
  ): Promise<{ token: string; refreshToken?: string }>;
  logout(userId: string, refreshToken: string): Promise<void>;
  getLoggedInUser(accessToken: string): Promise<IUser | null>;
}
