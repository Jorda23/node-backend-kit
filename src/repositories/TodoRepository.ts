import { injectable } from "inversify";
import { Task } from "../models/Task";

export const ITodoRepositoryType = "ITodoRepository";

export interface ITodoRepository {
  getTodos(): Promise<Task[]>;
}

@injectable()
export class TodoRepository implements ITodoRepository {
  public async getTodos(): Promise<Task[]> {
    return new Promise<Task[]>((resolve) => {
      // Replace the following line with the actual logic to fetch todos
      const todos: Task[] = []; // Replace this with your actual implementation
      resolve(todos);
    });
  }
}
