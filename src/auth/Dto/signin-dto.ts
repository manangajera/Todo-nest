import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty() // Ensures 'name' cannot be empty
  @IsEmail()
  email: string;

  @IsNotEmpty() // Ensures 'password' cannot be empty
  @Length(8, 100) // Password must be between 8 and 100 characters long
  password: string;
}
