import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { Book } from "./model/Book"
import { User } from "./model/User"
import config from "./config"

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
