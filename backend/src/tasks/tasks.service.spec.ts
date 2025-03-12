import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tasks } from './schema/tasks.schema';
import { Model } from 'mongoose';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Tasks>;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'à faire',
  };

  const mockTaskModel = {
    find: jest.fn().mockResolvedValue([mockTask]),
    create: jest.fn().mockResolvedValue(mockTask),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockTask),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Tasks.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Tasks>>(getModelToken(Tasks.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get tasks', async () => {
    const tasks = await service.getTasks();
    expect(tasks).toEqual([mockTask]);
  });

  it('should create a task', async () => {
    const newTask = await service.createTask({
      title: 'nouveau test',
      description: 'nouvelle description',
      status: 'à faire',
    });
    expect(newTask).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const updatedTask = await service.updateTask('1', {
      description: 'maj description',
      status: 'à faire',
    });
    expect(updatedTask).toEqual(mockTask);
  });

  it('should delete a task', async () => {
    const deletedTask = await service.deleteTask('1');
    expect(deletedTask).toEqual(mockTask);
  });
});
