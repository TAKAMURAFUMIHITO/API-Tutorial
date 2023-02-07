import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./model/Book"
import { User } from "./model/User"
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Book, User],
  migrations: ["scr/migration/*.ts"],
});

export default AppDataSource;
