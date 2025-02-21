import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/inversifyConstants";
import { ITransactionService } from "../../service/interfaces/ITransactionService";
import { ITransactionController } from "../interfaces/ITransactionController";
import Stripe from "stripe";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(
    @inject(TYPES.ITransactionService)
    private transactionService: ITransactionService
  ) {}

  async createPayment(req: Request, res: Response) {
    const { amount, currency, user } = req.body;

    try {
      const { clientSecret } =
        await this.transactionService.createPaymentIntent(
          amount,
          currency,
          user
        );
      res.status(200).json({ clientSecret });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async webhookHandler(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"] as string;

    if (!sig) {
      return res.status(400).send("Missing Stripe signature");
    }

    try {
      await this.transactionService.handleStripeWebhook(req.body);
      res.json({ received: true });
    } catch (error: any) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}
