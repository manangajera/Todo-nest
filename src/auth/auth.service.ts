/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Method to sign in a user and return a JWT token
  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      // Find the user by email
      const user = await this.userService.findOne({ email });

      // If user is not found, return an UnauthorizedException
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Ensure password exists before comparing
      if (!user.password) {
        throw new InternalServerErrorException('User password is missing');
      }

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Create the JWT payload
      const payload = { id: user._id, username: user.name };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error('Sign-in error:', error.message);
      throw error; // Re-throw so NestJS handles it properly
    }
  }
}
