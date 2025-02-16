import { IsEmail, IsString, Length } from "class-validator";

export class ResetPasswordDTO {
  @IsString()
  token!: string;

  @IsString()
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  newPassword!: string;
}
