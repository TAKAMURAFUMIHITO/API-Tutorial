import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "docker",
  password: "docker",
  database: "tutorial",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  // migrations: ["scr/migration/**/*.js"],
});

export default AppDataSource;
