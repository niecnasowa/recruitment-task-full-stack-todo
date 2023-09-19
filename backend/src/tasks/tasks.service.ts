import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, content: 'content 1', done: false },
    { id: 2, content: 'content 2', done: true },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  create(content: string): Task {
    const task: Task = {
      id: Date.now(),
      content,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  delete(id: number): void {
    const task = this.tasks.find((task) => task.id == id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id != id);
  }

  update(id: number, done: boolean): Task {
    const task = this.tasks.find((task) => task.id == id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (task) task.done = done;
    return task;
  }
}
