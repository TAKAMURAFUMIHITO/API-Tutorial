import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { Book } from "./model/Book";
import { User } from "./model/User";
import config from "./config";
import BookSeeder from "../src/seeds/book.seeder";
import UserSeeder from "../src/seeds/user.seeder";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.connection.host,
  port: Number(config.connection.port),
  username: config.connection.username,
  password: config.connection.password,
  database: config.connection.database,
  synchronize: true,
  logging: true,
  entities: [Book, User],
});

export const testDataSourceOptions: DataSourceOptions & SeederOptions = {
  type: "better-sqlite3",
  database: "db.sqlite",
  entities: [Book, User],
  seeds: [BookSeeder, UserSeeder],
};

export const TestDataSource = new DataSource(testDataSourceOptions);
