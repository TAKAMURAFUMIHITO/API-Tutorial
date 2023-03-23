import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../model/User";

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: "しんちゃん",
        firstname: "のはら",
        lastname: "しんのすけ",
        email: "test1@example.com",
        password: "123456",
      },
      {
        username: "のびた",
        firstname: "のび",
        lastname: "のびた",
        email: "test2@example.com",
        password: "123456",
      },
    ]);
  }
}
