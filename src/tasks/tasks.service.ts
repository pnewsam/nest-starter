import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getTasks() {
    return this.tasksRepository.find();
  }

  getTask(id) {
    return this.tasksRepository.findOne(id);
  }

  addTask({ ...args }) {
    const task = new Task();
    this.updateFieldsIfPresent(task, args);
    return this.tasksRepository.save(task);
  }

  async updateTask({ id, ...args }) {
    const task = await this.tasksRepository.findOne(id);
    this.updateFieldsIfPresent(task, args);
    return this.tasksRepository.save(task);
  }

  deleteTask(id) {
    return this.tasksRepository.delete(id);
  }

  private updateFieldsIfPresent(task, args) {
    ['text', 'completed'].forEach(field => {
      if (typeof args[field] !== 'undefined') {
        task[field] = args[field];
      }
    });
  }
}
