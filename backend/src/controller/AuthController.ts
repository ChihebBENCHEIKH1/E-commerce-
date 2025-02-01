import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../config/inversifyConstants";
import { AuthService } from "../service/authService/AuthService";

@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      await this.authService.register(username, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}
