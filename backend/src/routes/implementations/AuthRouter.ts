import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/inversifyConstants";
import { requestValidationMiddleware } from "../../middleware/requestValidationMiddleware";
import { RegisterDTO } from "../../dto/RegisterDTO";
import { LoginDTO } from "../../dto/LoginDTO";
import { ResetPasswordDTO } from "../../dto/ResetPasswordDTO";
import { VerifyOTPDTO } from "../../dto/VerifyOTPDTO";
import { IRouter } from "../interfaces/IRouter";
import { IAuthController } from "../../controller/interfaces/IAuthcontroller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { resetPasswordTokenMiddleware } from "../../middleware/resetPasswordMiddleware";

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
    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterDTO'
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/register",
      requestValidationMiddleware(RegisterDTO),
      (req, res) => this.authController.register(req, res)
    );

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login a user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDTO'
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: JWT token for authentication
     *       400:
     *         description: Invalid email or password
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/login",
      requestValidationMiddleware(LoginDTO),
      (req, res) => this.authController.login(req, res)
    );

    /**
     * @swagger
     * /api/auth/verify-otp:
     *   post:
     *     summary: Verify OTP
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/VerifyOTPDTO'
     *     responses:
     *       200:
     *         description: OTP verified successfully
     *       400:
     *         description: Invalid OTP
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/verify-otp",
      requestValidationMiddleware(VerifyOTPDTO),
      (req, res) => this.authController.verifyOTP(req, res)
    );

    /**
     * @swagger
     * /api/auth/reset-password:
     *   post:
     *     summary: Reset user password
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ResetPasswordDTO'
     *     responses:
     *       200:
     *         description: Password reset successfully
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/reset-password",
      resetPasswordTokenMiddleware,
      requestValidationMiddleware(ResetPasswordDTO),
      (req, res) => this.authController.resetPassword(req, res)
    );

    /**
     * @swagger
     * /api/auth/refresh:
     *   post:
     *     summary: Refresh authentication token
     *     tags: [Authentication]
     *     responses:
     *       200:
     *         description: Token refreshed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: New JWT token
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    this.router.post("/refresh", (req, res) =>
      this.authController.refreshToken(req, res)
    );

    /**
     * @swagger
     * /api/auth/logout:
     *   post:
     *     summary: Logout a user
     *     tags: [Authentication]
     *     responses:
     *       200:
     *         description: Logout successful
     *       500:
     *         description: Internal server error
     */
    this.router.post("/logout", (req, res) =>
      this.authController.logout(req, res)
    );

    /**
     * @swagger
     * /api/auth/me:
     *   get:
     *     summary: Get logged-in user details
     *     tags: [Authentication]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    this.router.get("/me", authMiddleware, (req, res) =>
      this.authController.getLoggedInUser(req, res)
    );
  }
}
