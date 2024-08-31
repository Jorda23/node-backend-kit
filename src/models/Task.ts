// models/Task.ts
import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Task extends Model<Task> {
  @Column
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
