import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @Post()
  addTask(@Body('text') text: string, @Body('completed') completed: boolean) {
    return this.tasksService.addTask({ text, completed });
  }

  @Patch()
  updateTask(
    @Body('id') id: string,
    @Body('text') text: string,
    @Body('completed') completed: boolean,
  ) {
    return this.tasksService.updateTask({ id, text, completed });
  }

  @Delete()
  deleteTask(@Body('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
