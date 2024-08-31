import { inject, injectable } from "inversify";
import { TaskRepository, ITaskRepositoryType } from "../repositories/TaskRepository";
import { Task } from "../models/Task";

export const ITodoServiceType = "ITodoService";

export interface ITodoService {
  getTodos(): Promise<Task[]>;
}

@injectable()
export class TodoService implements ITodoService {
  constructor(
    @inject(ITaskRepositoryType) private todoRepository: TaskRepository
  ) {}

  public async getTodos(): Promise<Task[]> {
    return this.todoRepository.getAllTasks();
  }
}
