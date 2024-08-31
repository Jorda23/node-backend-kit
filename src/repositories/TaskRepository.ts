import { injectable } from "inversify";
import { Task } from "../models/Task";
import { User } from "../models/User";

export const ITaskRepositoryType = "ITaskRepository";

export interface ITaskRepository {
  createTask(title: string, description: string, userId: number): Promise<Task>;
  getTaskById(taskId: number): Promise<Task | null>;
  getAllTasks(): Promise<Task[]>;
  updateTask(
    taskId: number,
    updatedTask: Partial<Task>
  ): Promise<[number, Task[]]>;
  deleteTask(taskId: number): Promise<number>;
}

@injectable()
export class TaskRepository implements ITaskRepository {
  public async createTask(
    title: string,
    description: string,
    userId: number
  ): Promise<Task> {
    return Task.create({ title, description, userId });
  }

  public async getTaskById(taskId: number): Promise<Task | null> {
    return Task.findByPk(taskId);
  }

  public async getAllTasks(): Promise<Task[]> {
    return Task.findAll();
  }

  public async updateTask(
    taskId: number,
    updatedTask: Partial<Task>
  ): Promise<[number, Task[]]> {
    const [affectedCount, updatedTasks] = await Task.update(updatedTask, {
      where: { id: taskId },
      returning: true,
    });
    return [affectedCount, updatedTasks];
  }

  public async deleteTask(taskId: number): Promise<number> {
    return Task.destroy({ where: { id: taskId } });
  }
}

export class UserRepository {
  public async createUser(name: string, email: string): Promise<User> {
    return User.create({ name, email });
  }

  public async getUserById(userId: number): Promise<User | null> {
    return User.findByPk(userId);
  }

  public async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public async updateUser(
    userId: number,
    updatedUser: Partial<User>
  ): Promise<[number, User[]]> {
    const [affectedCount, updatedUsers] = await User.update(updatedUser, {
      where: { id: userId },
      returning: true,
    });
    return [affectedCount, updatedUsers];
  }

  public async deleteUser(userId: number): Promise<number> {
    return User.destroy({ where: { id: userId } });
  }
}
