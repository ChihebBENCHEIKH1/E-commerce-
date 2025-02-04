import { IsString, IsOptional } from "class-validator";

export class LoginDTO {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  recaptcha!: string;

  @IsOptional()
  @IsString()
  otp?: string;
}
