import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/inversifyConstants";
import { requestValidationMiddleware } from "../middleware/requestValidationMiddleware";
import { RegisterDTO } from "../dto/RegisterDTO";
import { AuthController } from "../controller/AuthController";
import { LoginDTO } from "../dto/LoginDTO";
import { ResetPasswordDTO } from "../dto/ResetPasswordDTO";

@injectable()
export class AuthRoutes {
  public router: Router;

  constructor(
    @inject(TYPES.AuthController) private authController: AuthController
  ) {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post(
      "/register",
      requestValidationMiddleware(RegisterDTO),
      (req, res) => this.authController.register(req, res)
    );

    this.router.post(
      "/login",
      requestValidationMiddleware(LoginDTO),
      (req, res) => this.authController.login(req, res)
    );

    this.router.post(
      "/reset-password",
      requestValidationMiddleware(ResetPasswordDTO),
      (req, res) => this.authController.resetPasswordWithOTP(req, res)
    );
  }
}
