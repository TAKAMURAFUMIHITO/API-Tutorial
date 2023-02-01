import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  readonly createDate?: string;

  @UpdateDateColumn()
  readonly updateDate?: string;

  @OneToMany(() => Book, (book) => book.user)
  books?: Book[];

  constructor(username: string, firstname: string, lastname: string, email: string, password: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
