import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./interfaces/ITransaction";

const TransactionSchema: Schema = new Schema(
  {
    paymentIntentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
