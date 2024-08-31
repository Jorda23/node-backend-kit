// models/User.ts
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Task } from './Task';

@Table
export class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @HasMany(() => Task)
  tasks!: Task[];
}
