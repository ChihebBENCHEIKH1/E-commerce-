import mongoose, { ObjectId } from "mongoose";
import { IUser } from "./IUser";

export interface ITransaction extends Document {
  _id: ObjectId;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
