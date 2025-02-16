import { IsString, IsNotEmpty, Length } from "class-validator";

export class VerifyOTPDTO {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;
}
