import { IsNumber, IsString } from "class-validator";

export class RegisterDTO {
  @IsString()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsNumber()
  country!: number;

  @IsString()
  recaptcha!: string;
}
