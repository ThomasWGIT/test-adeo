import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  getTask() {
    console.log('getTask');
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    console.log(body);
    return this.tasksService.createTask(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id) {
    return this.tasksService.deleteTask(id);
  }
}
