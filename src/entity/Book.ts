import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
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

  @ManyToOne(() => User, (user) => user.books)
  user?: User;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
