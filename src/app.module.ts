import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { TodosModule } from './Todo/todo.module';

config(); // Call config() instead of dotenv.config()
console.log('MongoDB URI:', process.env.MONGO_URL);
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pokemonfj12:BnY1E7H7yFUUThd9@cluster0.locgq.mongodb.net/todo?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
