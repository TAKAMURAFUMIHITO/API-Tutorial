import { DataSource, DataSourceOptions } from "typeorm";
import {
  runSeeders,
  createDatabase,
  dropDatabase,
  SeederOptions,
} from "typeorm-extension";
import { Book } from "./model/Book";
import { User } from "./model/User";
import BookSeeder from "./seeds/book.seeder";

describe("リポジトリテスト", () => {
  const testDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "better-sqlite3",
    database: "db.sqlite",
    entities: [Book, User],
    seeds: [BookSeeder],
  };

  const TestDataSource = new DataSource(testDataSourceOptions);

  beforeAll(async () => {
    await createDatabase({
      options: testDataSourceOptions,
    });

    await TestDataSource.initialize();
    await runSeeders(TestDataSource);
  });

  afterAll(async () => {
    await dropDatabase({
      options: testDataSourceOptions,
    });
  });
  const bookRepository = TestDataSource.getRepository(Book);
  test("本を全件取得", async () => {
    const books = await bookRepository.find();
    expect(books.length).toBe(2);
  });

  test("特定の本を取得", async () => {
    const book = await bookRepository.find({
      where: { id: 1 },
    });
    const expectedBook: Partial<Book> = {
      id: 1,
      title: "奥の細道",
      body: "月日は百代の過客にして、行かふ年も又旅人也。",
    };
    expect(book).toContainEqual(expect.objectContaining(expectedBook));
  });

  test("本を投稿", async () => {
    await bookRepository.insert({
      title: "源氏物語",
      body: "清少納言ではなく、紫式部の作品です。",
      userId: 1,
    });
    const books = await bookRepository.find();
    expect(books.length).toBe(3);
  });

  test("特定の本を更新", async () => {
    await bookRepository.update(3, {
      title: "枕草子",
      body: "これが清少納言の作品です。",
    });
    const book = await bookRepository.find({
      where: { id: 3 },
    });
    const expectedBook: Partial<Book> = {
      id: 3,
      title: "枕草子",
      body: "これが清少納言の作品です。",
    };
    expect(book).toContainEqual(expect.objectContaining(expectedBook));
  });

  test("特定の本を削除", async () => {
    await bookRepository.delete(3);
    const books = await bookRepository.find();
    expect(books.length).toBe(2);
  });
  /*
  test("会員登録", () => {
    async () => {
      const response = await request(registerUser).post("/user/resister");
      expect(response.statusCode).toBe(200);
    };
  });

  test("ログイン", () => {
    async () => {
      const response = await request(loginUser).post("/user/login");
      expect(response.statusCode).toBe(200);
    };
  });

  test("ユーザー情報更新", () => {
    async () => {
      const response = await request(putUser).put("/user/3");
      expect(response.statusCode).toBe(200);
    };
  });

  test("ユーザー削除", () => {
    async () => {
      const response = await request(deleteUser).delete("/user/3");
      expect(response.statusCode).toBe(200);
    };
  });
  */
});
