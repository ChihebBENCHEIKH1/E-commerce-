// src/routes/AuthRoutes.ts
import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/inversifyConstants";
import { requestValidationMiddleware } from "../middleware/requestValidationMiddleware";
import { UserDTO } from "../dto/UserDTO";
import { AuthController } from "../controller/AuthController";

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
      requestValidationMiddleware(UserDTO),
      (req, res) => this.authController.register(req, res)
    );

    this.router.post(
      "/login",
      requestValidationMiddleware(UserDTO),
      (req, res) => this.authController.login(req, res)
    );
  }
}
