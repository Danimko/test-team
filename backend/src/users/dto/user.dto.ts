import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  number: number;
}
