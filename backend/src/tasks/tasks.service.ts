import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks, TasksDocument } from './schema/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}

  async getTasks(): Promise<TasksDocument[]> {
    return await this.tasksModel.find();
  }

  async createTask(body: CreateTaskDto): Promise<TasksDocument> {
    return await this.tasksModel.create(body);
  }

  async updateTask(id: string, body: UpdateTaskDto) {
    return await this.tasksModel.findByIdAndUpdate(id, body);
  }

  async deleteTask(id: string) {
    return await this.tasksModel.findByIdAndDelete(id);
  }
}
