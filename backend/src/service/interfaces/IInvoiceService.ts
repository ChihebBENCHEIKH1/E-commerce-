import { ITransaction } from "../../models/interfaces/ITransaction";
import { IUser } from "../../models/interfaces/IUser";

export interface IInvoiceService {
  generateInvoice(user: IUser, transaction: ITransaction): Promise<string>;
}
