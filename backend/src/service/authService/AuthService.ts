import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../repository/user/IUserRepository";
import { TYPES } from "../../config/inversifyConstants";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  RECAPTCHA_SECRET_KEY,
} from "../../config/env";
import { captchaHelper } from "../../utils/captchaCheck";
import { RegisterDTO } from "../../dto/RegisterDTO";
import { UserModel } from "../../models/user/User";
import { authenticator } from "otplib";
import { generateOTP, sendOTPEmail } from "../../utils/optUtils";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async verifyCaptcha(captchaResponse: string): Promise<boolean> {
    return captchaHelper.verifyCaptcha(
      captchaResponse,
      String(RECAPTCHA_SECRET_KEY)
    );
  }

  async register({
    email,
    firstName,
    lastName,
    country,
    recaptcha,
  }: RegisterDTO): Promise<void> {
    const isCaptchaValid = await this.verifyCaptcha(recaptcha);
    if (!isCaptchaValid) {
      throw new Error("Invalid CAPTCHA");
    }

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const otpSecret = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      country,
      otpSecret,
      otpExpiry,
    });

    //await sendOTPEmail(email, otpSecret);
  }

  async login(
    email: string,
    password: string,
    recaptcha: string,
    otp?: string
  ): Promise<string> {
    const isCaptchaValid = await this.verifyCaptcha(recaptcha);
    if (!isCaptchaValid) {
      throw new Error("Invalid CAPTCHA");
    }

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      if (!otp) {
        throw new Error("OTP is required. Please verify your account first.");
      }

      const isOtpValid = await this.verifyUserOTP(email, otp);
      if (!isOtpValid) {
        throw new Error("Invalid OTP");
      }

      const token = jwt.sign({ userId: user._id }, String(JWT_SECRET), {
        expiresIn: Number(JWT_EXPIRES_IN),
      });
      return token;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, String(JWT_SECRET), {
      expiresIn: Number(JWT_EXPIRES_IN),
    });

    return token;
  }

  async createUserWithOTP(email: string) {
    const otp = generateOTP();

    const user = new UserModel({ email, otp });
    await user.save();

    await sendOTPEmail(email, otp);
  }

  async verifyUserOTP(userEmail: string, inputOTP: string): Promise<boolean> {
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = authenticator.verify({
      token: inputOTP,
      secret: String(user.otpSecret),
    });

    if (isValid) {
      user.otpExpiry = new Date();
      await user.save();
    }

    return isValid;
  }

  async updatePassword(userEmail: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(userEmail);

    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.otpSecret = "";
    user.otpExpiry = null;

    await user.save();
  }
}
