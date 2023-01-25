import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entity/Book"

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 13306,
  username: "docker",
  password: "docker",
  database: "tutorial",
  synchronize: true,
  logging: true,
  entities: [Book],
  migrations: ["scr/migration/*.ts"],
});

export default AppDataSource;
