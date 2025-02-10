import { IsNotEmpty, IsEmail, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 100) // Example: Basic length check
  password: string;
}
