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
    this.router.post(
      "/create-payment-intent",
      authMiddleware,
      requestValidationMiddleware(CreatePaymentIntentDTO),
      (req, res) => this.transactionController.createPayment(req, res)
    );
    this.router.post(
      "/webhook",
      raw({ type: "application/json" }),
      (req, res) => this.transactionController.webhookHandler(req, res)
    );
  }
}
