import { injectable } from "inversify";
import { ITransaction } from "../../models/interfaces/ITransaction";
import { IUser } from "../../models/interfaces/IUser";
import Transaction from "../../models/Transaction";
import { ITransactionRepository } from "../interfaces/ITransactionRepository";

@injectable()
export class TransactionRepository implements ITransactionRepository {
  async createTransaction(
    paymentIntentId: string,
    amount: number,
    currency: string,
    status: string,
    user: IUser
  ): Promise<ITransaction> {
    const transaction = new Transaction({
      paymentIntentId,
      amount,
      currency,
      status,
      user: user._id,
    });
    return await transaction.save();
  }

  async updateTransactionStatus(
    paymentIntentId: string,
    status: string
  ): Promise<ITransaction | null> {
    return await Transaction.findOneAndUpdate(
      { paymentIntentId },
      { status },
      { new: true }
    );
  }

  async findTransactionByPaymentIntentId(
    paymentIntentId: string
  ): Promise<ITransaction | null> {
    return await Transaction.findOne({ paymentIntentId });
  }
}
