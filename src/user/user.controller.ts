import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user-dto/create-user-dto';
import { User } from './user.schema';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createuser(@Body() createuserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createuserDto;
    return this.userService.createUser(name, email, password);
  }
  @Get()
  async fff(@Body() body: { name: string; email: string }) {
    const { name, email } = body;
    return this.userService.findOne({ email, name });
  }
}
