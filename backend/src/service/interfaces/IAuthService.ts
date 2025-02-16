import { RegisterDTO } from "../../dto/RegisterDTO";

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
}
