import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity('books')
export class Book{
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  readonly createDate?: string;

  @UpdateDateColumn()
  readonly updateDate?: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.books, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({name: "userId"})
  user?: User;

  constructor(title: string, body: string, userId: number) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }
}
