/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { TodosService } from './todo.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() body: { title: string; description: string ;userId: string}) {
    return this.todosService.create(body.title, body.description,body.userId);
  }

  @Get(":userId")
  async findAll(userId: string) {
    return this.todosService.findAll(userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, userId: string) {
    return this.todosService.delete(id, userId);
  }
}
