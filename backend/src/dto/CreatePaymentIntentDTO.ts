import { IsString, IsNumber, IsObject } from "class-validator";
import { IUser } from "../models/interfaces/IUser";

export class CreatePaymentIntentDTO {
  @IsNumber()
  amount!: string;

  @IsString()
  currency!: string;

  @IsObject()
  user!: any;
}
