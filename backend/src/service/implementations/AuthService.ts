import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../repository/user/interfaces/IUserRepository";
import { TYPES } from "../../config/inversifyConstants";
import { FRONTEND_URL, RECAPTCHA_SECRET_KEY } from "../../config/env";
import { captchaHelper } from "../../utils/captchaCheck";
import { RegisterDTO } from "../../dto/RegisterDTO";
import { UserModel } from "../../models/User";
import { authenticator } from "otplib";
import { generateOTP, validateOTP } from "../../utils/optUtils";
import {
  generateAccessToken,
  generatePasswordResetToken,
  generateRefreshToken,
} from "../../utils/JWTHelper";
import { IEmailService } from "../interfaces/IEmailService";
import { IAuthService } from "../interfaces/IAuthService";
import moment from "moment";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IEmailService) private emailService: IEmailService
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
    role,
  }: RegisterDTO): Promise<void> {
    const isCaptchaValid = await this.verifyCaptcha(recaptcha);
    if (!isCaptchaValid) {
      throw new Error("Invalid CAPTCHA");
    }

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const { otp, otpSecret, otpExpiry } = generateOTP();

    await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      country,
      otpSecret,
      otpExpiry,
      role,
    });

    await this.sendOTPEMail(email, otp);
  }

  async login({
    email,
    password,
    recaptcha,
  }: {
    email: string;
    password: string;
    recaptcha: string;
  }): Promise<{ token: string; refreshToken: string }> {
    const isCaptchaValid = await this.verifyCaptcha(recaptcha);
    if (!isCaptchaValid) {
      throw new Error("Invalid CAPTCHA");
    }
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return {
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    };
  }

  async verifyUserOTP({
    userEmail,
    otp,
  }: {
    userEmail: string;
    otp: string;
  }): Promise<void> {
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = validateOTP(otp, String(user.otpSecret));

    if (!isValid) {
      throw new Error("Invalid OTP");
    }

    const resetPasswordToken = generatePasswordResetToken(user._id);
    user.otpExpiry = new Date();
    user.otpSecret = "";
    user.otpVerified = true;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = moment().add(1, "hour").toDate();
    await user.save();

    this.sendResetPasswordEmail(
      user.email,
      `${FRONTEND_URL}/MotorcycleXpert/reset-password?token=${resetPasswordToken}`
    );
  }

  async updatePassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findUserByResetPasswordToken(token);

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    if (!user.activated) {
      user.activated = true;
    }

    await user.save();
  }

  private async sendOTPEMail(email: string, otp: string): Promise<void> {
    const subject = "Your OTP Code for Secure Login";
    const text = `Your OTP code is: ${otp}. It will expire in 30 seconds.`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
        <h2 style="color: #d32f2f;">Your OTP Code</h2>
        <p style="font-size: 16px;">Use the following OTP to complete your login:</p>
        <p style="font-size: 22px; font-weight: bold; background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">
          ${otp}
        </p>
        <p style="color: #555;">This OTP will expire in <strong>30 seconds</strong>. Do not share it with anyone.</p>
        <p style="font-size: 14px; color: #777;">If you did not request this code, please ignore this email.</p>
      </div>
    `;
    await this.emailService.sendEmail(email, subject, text, html);
  }

  async sendResetPasswordEmail(
    email: string,
    resetLink: string
  ): Promise<void> {
    const subject = "Password Reset Request";
    const text = `Click the link below to reset your password:\n${resetLink}`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
        <h2 style="color: #d32f2f;">Password Reset</h2>
        <p style="font-size: 16px;">Click the button below to reset your password:</p>
        <a href="${resetLink}" style="background-color: #d32f2f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
          Reset Password
        </a>
        <p style="color: #555;">This link will expire in <strong>1 hour</strong>. Do not share it with anyone.</p>
        <p style="font-size: 14px; color: #777;">If you did not request this password reset, please ignore this email.</p>
      </div>
    `;

    await this.emailService.sendEmail(email, subject, text, html);
  }
}
