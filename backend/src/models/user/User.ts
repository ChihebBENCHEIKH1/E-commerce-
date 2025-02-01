import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./IUser";
import { getEnvVar } from "../../utils/helper";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(Number(getEnvVar("SALT_ROUNDS", 10)));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
