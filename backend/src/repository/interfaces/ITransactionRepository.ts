import { ITransaction } from "../../models/interfaces/ITransaction";
import { IUser } from "../../models/interfaces/IUser";

export interface ITransactionRepository {
  createTransaction(
    paymentIntentId: string,
    amount: number,
    currency: string,
    status: string,
    user: IUser
  ): Promise<ITransaction>;
  updateTransactionStatus(
    paymentIntentId: string,
    status: string
  ): Promise<ITransaction | null>;
  findTransactionByPaymentIntentId(
    paymentIntentId: string
  ): Promise<ITransaction | null>;
}
