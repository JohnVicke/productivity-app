import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ITodo } from '../types/ITodo';
import { User } from './User';

@Entity()
export class Todo extends BaseEntity implements ITodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  completed: boolean;

  @Column()
  title: string;

  @Column()
  dueDate: Date;

  /* Start relations */
  @ManyToOne(() => User, user => user.todos)
  user: User;

  @Column()
  userId: number;

  /* End relations */

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();
}
