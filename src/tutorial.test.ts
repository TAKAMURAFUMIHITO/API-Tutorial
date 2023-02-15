import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, createDatabase, dropDatabase, SeederOptions } from 'typeorm-extension';
import { Book } from "./model/Book";
import { User } from "./model/User";
import BookSeeder from "./database/seeds/book.seeder";

describe("テスト", () => {
  const testDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "better-sqlite3",
    database: "db.sqlite",
    entities: [Book, User],
    seeds: [BookSeeder],
  };

  const TestDataSource = new DataSource(
    testDataSourceOptions
  );

  beforeEach(async () => {
    await createDatabase({
      options: testDataSourceOptions
    });

    await TestDataSource.initialize();
    await runSeeders(TestDataSource);
  });

  afterEach(async () => {
    await dropDatabase({
      options:testDataSourceOptions
    });
  });

  test("本を全件取得", async () => {
    const bookRepository = TestDataSource.getRepository(Book);

    const books = await bookRepository.find({
      where: {id: 1},
    });

    // booksの長さが1であることを確認
    // expect(books.length).toBe(1);

    const expectedBook: Partial<Book> = {
      id: 1,
      title: "奥の細道",
      body: "月日は百代の過客にして、行かふ年も又旅人也。",
    }

    expect(books).toContainEqual(
      expect.objectContaining(expectedBook)
    );
  });

/*
  test("特定の本を取得", () => {
    expect(getBook).toBe();
  });

  test("本を投稿", () => {
    expect(postBook).toBe();
  });

  test("特定の本を更新", () => {
    expect(putBook).toBe();
  });

  test("特定の本を削除", () => {
    expect(deleteBook).toBe();
  });

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
