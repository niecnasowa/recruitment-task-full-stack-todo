import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      // Service has default value, so should be correct according to the default value
      expect(await service.findAll()).toMatchSnapshot();
    });
  });

  describe('create', () => {
    it('should create and return a task, should return this task when return all', async () => {
      const result = await service.create('Test task');

      expect(result).toMatchObject({
        content: 'Test task',
        done: false,
      });

      expect(await service.findAll()).toContainEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      expect((await service.findAll()).length).toBe(2);
      await service.delete(1);
      expect((await service.findAll()).length).toBe(1);
    });

    it('should throw an error if task is not found', async () => {
      expect((await service.findAll()).length).toBe(2);
      expect(() => service.delete(999)).toThrow('Task with ID 999 not found');
      expect((await service.findAll()).length).toBe(2);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 1;

      expect(
        (await service.findAll()).find(({ id }) => id === taskId).done,
      ).toBe(false);

      expect(await service.update(taskId, true)).toMatchObject({ done: true });

      expect(
        (await service.findAll()).find(({ id }) => id === taskId).done,
      ).toBe(true);
    });

    it('should throw an error if task is not found', async () => {
      const taskId = 999;
      const allTasksBeforeAction = await service.findAll();

      expect(() => service.update(taskId, true)).toThrow(
        'Task with ID 999 not found',
      );
      expect(await service.findAll()).toEqual(allTasksBeforeAction);
    });
  });
});
