import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class RegisterDTO {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsNumber()
  country!: number;

  @IsBoolean()
  marketing: boolean = false;

  @IsBoolean()
  profiling: boolean = false;

  @IsString()
  recaptcha!: string;

  @IsString()
  role!: string;
}
