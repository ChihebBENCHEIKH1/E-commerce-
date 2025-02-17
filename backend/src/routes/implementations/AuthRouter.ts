import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/inversifyConstants";
import { requestValidationMiddleware } from "../../middleware/requestValidationMiddleware";
import { RegisterDTO } from "../../dto/RegisterDTO";
import { LoginDTO } from "../../dto/LoginDTO";
import { ResetPasswordDTO } from "../../dto/ResetPasswordDTO";
import { VerifyOTPDTO } from "../../dto/VerifyOTPDTO";
import { resetPasswordTokenMiddleware } from "../../middleware/resetPasswordMiddleware";
import { IRouter } from "../interfaces/IRouter";
import { IAuthController } from "../../controller/interfaces/IAuthcontroller";

@injectable()
export class AuthRouter implements IRouter {
  public router: Router;

  constructor(
    @inject(TYPES.IAuthController) private authController: IAuthController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
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
      "/verify-otp",
      requestValidationMiddleware(VerifyOTPDTO),
      (req, res) => this.authController.verifyOTP(req, res)
    );

    this.router.post(
      "/reset-password",
      resetPasswordTokenMiddleware,
      requestValidationMiddleware(ResetPasswordDTO),
      (req, res) => this.authController.resetPassword(req, res)
    );

    this.router.post("/refresh", (req, res) =>
      this.authController.refreshToken(req, res)
    );
  }
}
