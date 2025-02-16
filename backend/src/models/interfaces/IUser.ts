import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  country: Number;
  otpSecret: String;
  otpExpiry: Date | null;
  otpVerified: Boolean;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date | null;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
