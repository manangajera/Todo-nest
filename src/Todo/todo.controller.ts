/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  Query,
} from '@nestjs/common';
import { TodosService } from './todo.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(
    @Request() req,
    @Body() body: { title: string; status: boolean },
  ) {
    return this.todosService.create(body.title, body.status, req.user.userId);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const todos = await this.todosService.findAll(req.user.userId, page, limit);
    return todos;
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.todosService.delete(id, req.user.userId);
  }
}
