import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../../config/inversifyConstants";
import { IAuthService } from "../../service/interfaces/IAuthService";
import { IAuthController } from "../interfaces/IAuthcontroller";

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.register(req.body);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, recaptcha } = req.body;

      const response = await this.authService.login({
        email,
        password,
        recaptcha,
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      await this.authService.verifyUserOTP({
        userEmail: email,
        otp,
      });
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await this.authService.updatePassword(token, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Password reset failed" });
    }
  }
}
