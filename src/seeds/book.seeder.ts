import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Book } from "../model/Book";

export default class BookSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(Book);
    await repository.insert([
      {
        title: "奥の細道",
        body: "月日は百代の過客にして、行かふ年も又旅人也。",
        userId: 1
      },
      {
        title: "吾輩は猫である",
        body: "吾輩は猫である",
        userId: 2
      },

    ]);
  };
};
