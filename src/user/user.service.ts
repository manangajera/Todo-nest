/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserDocument} from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async createUser(name: string, email: string, password: string): Promise<User> {
    try {
      const userExists = await this.findOne({ email, name });
      if (userExists) {
        throw new ConflictException('User with this email already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({ name, email, password: hashedPassword });
      return await user.save();
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error; // Ensures NestJS properly handles it
    }
  }
  
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne(filter: Partial<{ email: string; name: string }>): Promise<User | null> {
    const user = await this.userModel.findOne(filter).select('+password').exec();
    return user;
  }
  
}