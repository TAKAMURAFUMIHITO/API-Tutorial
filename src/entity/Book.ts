import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
