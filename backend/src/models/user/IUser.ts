import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  country: Number;
  otpSecret: String;
  otpExpiry: Date | null;
  otpVerified: Boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
