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
    MongooseModule.forRoot(process.env.MONGO_URL ),
    UserModule,
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
