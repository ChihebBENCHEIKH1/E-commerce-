import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../config/inversifyConstants";
import { AuthService } from "../service/authService/AuthService";

@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, firstName, lastName, recaptcha, country } = req.body;
      await this.authService.register({
        email,
        firstName,
        lastName,
        recaptcha,
        country,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, recaptcha, otp } = req.body;

      const token = await this.authService.login(
        email,
        password,
        recaptcha,
        otp
      );
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }

  async resetPasswordWithOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;

      const isOtpValid = await this.authService.verifyUserOTP(email, otp);
      if (!isOtpValid) {
        throw new Error("Invalid OTP");
      }

      await this.authService.updatePassword(email, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Password reset failed" });
    }
  }
}
