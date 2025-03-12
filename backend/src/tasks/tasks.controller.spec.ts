import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn().mockResolvedValue(['task1', 'task2']),
            createTask: jest.fn().mockResolvedValue('task1'),
            updateTask: jest.fn().mockResolvedValue('task1'),
            deleteTask: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tasks', async () => {
    const result = await controller.getTask();
    expect(result).toEqual(['task1', 'task2']);
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test',
      description: 'Test Description',
      status: 'à faire',
    };
    const result = await controller.createTask(createTaskDto);
    expect(result).toEqual('task1');
  });

  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated Description',
    };
    const result = await controller.updateTask('1', updateTaskDto);
    expect(result).toEqual('task1');
  });

  it('should delete a task', async () => {
    const result = await controller.deleteTask('1');
    expect(result).toEqual(true);
  });
});
