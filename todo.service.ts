/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(title: string, description: string, userId: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, description, userId });
    return newTodo.save();
  }
  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).exec();
  }
  async delete(id: string, userId: string): Promise<Todo | null> {
    return this.todoModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}
