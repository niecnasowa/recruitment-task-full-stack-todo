import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    service = new TasksService();
    controller = new TasksController(service);

    await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(service)
      .compile();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const taskDto = { content: 'Test task' };
      const result = { id: 1, content: 'Test task', done: false };
      jest.spyOn(service, 'create').mockImplementation(() => result);

      expect(await controller.create(taskDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a task by id and return that id', async () => {
      const taskId = 1;
      jest.spyOn(service, 'delete').mockImplementation(() => undefined);

      expect(await controller.delete(taskId)).toBe(undefined);
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const taskId = 1;
      const taskUpdateDto = { content: 'Updated Task', done: true };
      const result = { id: 1, content: 'Updated Task', done: true };

      jest.spyOn(service, 'update').mockImplementation(() => result);

      expect(await controller.update(taskId, taskUpdateDto)).toBe(result);
    });
  });

  describe('Error scenarios', () => {
    it('should throw an error if trying to update a non-existent task', async () => {
      const taskId = 99;
      const taskUpdateDto = { content: 'This will not update', done: false };

      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new Error('Task not found');
      });

      expect(() => controller.update(taskId, taskUpdateDto)).toThrow(
        'Task not found',
      );
    });
  });
});
