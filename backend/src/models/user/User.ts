import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./IUser";
import { SALT_ROUNDS } from "../../config/env";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, required: true, enum: ["admin", "user"] },
  country: { type: Number, required: true },
  otpSecret: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  otpVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
