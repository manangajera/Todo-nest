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
  Put,
} from '@nestjs/common';
import { TodosService } from './todo.service';
// import { AuthGuard } from '@nestjs/passport';

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
  @Get()
  async findWithTitle(@Request() req, @Query('title') title: string) {
    return this.todosService.findewithtitle(title, req.user.userId);
  }

  // @UseGuards(JwtModule)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { title?: string; status?: boolean },
  ) {
    // console.log('controller User:', req.user);
    return this.todosService.updateTodo(
      id,
      req.user.userId,
      body.title,
      body.status,
    );
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.todosService.delete(id, req.user.userId);
  }
}
