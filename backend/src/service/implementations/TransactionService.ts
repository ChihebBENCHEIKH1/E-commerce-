import { inject, injectable } from "inversify";
import Stripe from "stripe";
import { TYPES } from "../../config/inversifyConstants";
import { ITransactionRepository } from "../../repository/interfaces/ITransactionRepository";
import { IUser } from "../../models/interfaces/IUser";
import { ITransaction } from "../../models/interfaces/ITransaction";
import { ITransactionService } from "../interfaces/ITransactionService";
import { STRIPE_SECRET_KEY } from "../../config/env";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { IInvoiceService } from "../interfaces/IInvoiceService";
import { IEmailService } from "../interfaces/IEmailService";

@injectable()
export class TransactionService implements ITransactionService {
  private stripe: Stripe;

  constructor(
    @inject(TYPES.ITransactionRepository)
    private transactionRepository: ITransactionRepository,
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository,
    @inject(TYPES.IInvoiceService)
    private invoiceService: IInvoiceService,
    @inject(TYPES.IEmailService)
    private emailService: IEmailService
  ) {
    this.stripe = new Stripe(STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-01-27.acacia",
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    user: IUser
  ): Promise<{ clientSecret: string | null }> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      const currentUser = await this.userRepository.findUserByEmail(user.email);
      if (!currentUser) {
        throw new Error("User not found");
      }
      await this.transactionRepository.createTransaction(
        paymentIntent.id,
        amount,
        currency,
        paymentIntent.status,
        currentUser
      );

      return { clientSecret: paymentIntent.client_secret };
    } catch (error: any) {
      throw new Error(`Error creating PaymentIntent: ${error?.message}`);
    }
  }

  async updateTransactionStatus(
    paymentIntentId: string,
    status: string
  ): Promise<ITransaction | null> {
    try {
      return await this.transactionRepository.updateTransactionStatus(
        paymentIntentId,
        status
      );
    } catch (error: any) {
      throw new Error(`Error updating transaction status: ${error.message}`);
    }
  }

  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const transaction = await this.updateTransactionStatus(
            paymentIntent.id,
            paymentIntent.status
          );

          if (transaction) {
            const userId = transaction.user;
            const user = await this.userRepository.findUserById(userId as any);
            if (user) {
              const invoicePath = await this.invoiceService.generateInvoice(
                user,
                transaction
              );
              console.log(
                `Invoice generated for transaction: ${transaction._id}`
              );

              await this.emailService.sendEmail(
                user.email,
                "Your Payment Invoice",
                "Please find your invoice attached.",
                "<p>Please find your invoice attached.</p>",
                [
                  {
                    filename: `invoice_${transaction._id}.pdf`,
                    path: invoicePath,
                  },
                ]
              );
            }
          }
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error: any) {
      console.error(`Webhook Error: ${error.message}`);
    }
  }
}
