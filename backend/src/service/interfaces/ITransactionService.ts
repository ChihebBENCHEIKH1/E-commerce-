import Stripe from "stripe";
import { ITransaction } from "../../models/interfaces/ITransaction";
import { IUser } from "../../models/interfaces/IUser";

export interface ITransactionService {
  createPaymentIntent(
    amount: number,
    currency: string,
    user: IUser
  ): Promise<{ clientSecret: string | null }>;

  updateTransactionStatus(
    paymentIntentId: string,
    status: string
  ): Promise<ITransaction | null>;

  handleStripeWebhook(event: Stripe.Event): Promise<void>;
}
