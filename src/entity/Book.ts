import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('books')
export class Book{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createDate!: string;

  @UpdateDateColumn()
  updateDate!: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
