import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 13306,
  username: "docker",
  password: "docker",
  database: "tutorial",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  // migrations: ["scr/migration/**/*.js"],
});

export default AppDataSource;
