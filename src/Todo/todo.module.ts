/* eslint-disable prettier/prettier */
import { Module,NestModule, RequestMethod,MiddlewareConsumer} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';
import { Todo, TodoSchema } from './todo.schema';
import { Middleware } from 'src/middleware/auth';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodosService],

})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes({ path: 'todos', method: RequestMethod.ALL });
}
}
