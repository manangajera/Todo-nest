/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';
@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(title: string, status: boolean, userId: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, status, userId });
    return newTodo.save();
  }

  async findAll(userId: string, page: number, limit: number): Promise<Todo[]> {
    const skip = (page - 1) * limit;

    return this.todoModel
      .find({ userId })
      .sort({ createdAt: -1 }) // Sorting by `createdAt` in descending order
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findewithtitle(title: string, userId: string): Promise<Todo[]> {
    return this.todoModel.find({ title: { $regex: title, $options: 'i' }, userId }).exec();
  }

  async updateTodo(id: string, userId: string, title?: string, status?: boolean): Promise<Todo | null> {
    const updateFields: Partial<Todo> = {};
  
    if (title) updateFields.title = title;
    if (status !== undefined) updateFields.status = status;
  
    return this.todoModel
      .findOneAndUpdate({ _id: id, userId }, { $set: updateFields }, { new: true })
      .exec();
  }
  

  async delete(id: string, userId: string): Promise<Todo | null> {
    return this.todoModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}
