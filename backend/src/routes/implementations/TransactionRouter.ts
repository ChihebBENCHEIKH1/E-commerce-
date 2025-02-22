import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/inversifyConstants";
import { requestValidationMiddleware } from "../../middleware/requestValidationMiddleware";
import { IRouter } from "../interfaces/IRouter";
import { ITransactionController } from "../../controller/interfaces/ITransactionController";
import { CreatePaymentIntentDTO } from "../../dto/CreatePaymentIntentDTO";
import { authMiddleware } from "../../middleware/authMiddleware";
import { raw } from "body-parser";

@injectable()
export class TransactionRouter implements IRouter {
  public router: Router;

  constructor(
    @inject(TYPES.ITransactionController)
    private transactionController: ITransactionController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    /**
     * @swagger
     * /api/transactions/create-payment-intent:
     *   post:
     *     summary: Create a payment intent
     *     tags: [Transactions]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePaymentIntentDTO'
     *     responses:
     *       200:
     *         description: Payment intent created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 clientSecret:
     *                   type: string
     *                   description: Client secret for payment confirmation
     *       400:
     *         description: Invalid input
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/create-payment-intent",
      authMiddleware,
      requestValidationMiddleware(CreatePaymentIntentDTO),
      (req, res) => this.transactionController.createPayment(req, res)
    );

    /**
     * @swagger
     * /api/transactions/webhook:
     *   post:
     *     summary: Handle payment webhook events
     *     tags: [Transactions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               event:
     *                 type: string
     *                 description: Payment event type
     *     responses:
     *       200:
     *         description: Webhook handled successfully
     *       400:
     *         description: Invalid event
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      "/webhook",
      raw({ type: "application/json" }),
      (req, res) => this.transactionController.webhookHandler(req, res)
    );
  }
}
