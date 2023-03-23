import { TestDataSource, testDataSourceOptions } from "../../src/data-source";
import { runSeeders, createDatabase, dropDatabase } from "typeorm-extension";
import { Book } from "../../src/model/Book";
import { User } from "../../src/model/User";
import BookRepository from "./bookRepositoryForTest";
import UserRepository from "./userRepositoryForTest";

describe("リポジトリ(データベース操作)テスト", () => {
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

  // bookRepositoryのテスト
  const bookRepository = new BookRepository();

  test("本を全件取得", async () => {
    const books = await bookRepository.findAll();
    expect(books.length).toBe(2);
  });

  test("id=1の本を取得", async () => {
    const book = await bookRepository.find(1);
    const expectedBook: Partial<Book> = {
      id: 1,
      title: "奥の細道",
      body: "月日は百代の過客にして、行かふ年も又旅人也。",
    };
    expect([book]).toContainEqual(expect.objectContaining(expectedBook));
  });

  test("id=3の本を取得しようとするとデータがない場合", async () => {
    const book = await bookRepository.find(3);
    expect(book).toBe(null);
  });

  test("本を投稿(id=3)", async () => {
    await bookRepository.create({
      title: "源氏物語",
      body: "清少納言ではなく、紫式部の作品です。",
      userId: 1,
    });

    const book = await bookRepository.find(3);
    const expectedBook: Partial<Book> = {
      id: 3,
      title: "源氏物語",
      body: "清少納言ではなく、紫式部の作品です。",
    };
    expect([book]).toContainEqual(expect.objectContaining(expectedBook));
  });

  test("id=3の本を更新", async () => {
    await bookRepository.update({
      id: 3,
      title: "枕草子",
      body: "これが清少納言の作品です。",
      userId: 1,
    });

    const book = await bookRepository.find(3);
    const expectedBook: Partial<Book> = {
      id: 3,
      title: "枕草子",
      body: "これが清少納言の作品です。",
    };
    expect([book]).toContainEqual(expect.objectContaining(expectedBook));
  });

  test("id=3の本を削除", async () => {
    await bookRepository.delete(3);

    const book = await bookRepository.find(3);
    expect(book).toBe(null);
  });

  // userRepositoryのテスト
  const userRepository = new UserRepository();

  test("すでに登録されているメールアドレスか確認(登録されている場合)", async () => {
    const user = await userRepository.findByEmail("test1@example.com");
    const expectedUser: Partial<User> = {
      id: 1,
      username: "しんちゃん",
      firstname: "のはら",
      lastname: "しんのすけ",
      email: "test1@example.com",
    };
    expect([user]).toContainEqual(expect.objectContaining(expectedUser));
  });

  test("すでに登録されているユーザーかidで確認", async () => {
    const user = await userRepository.findById(1);
    const expectedUser: Partial<User> = {
      id: 1,
      username: "しんちゃん",
      firstname: "のはら",
      lastname: "しんのすけ",
      email: "test1@example.com",
    };
    expect([user]).toContainEqual(expect.objectContaining(expectedUser));
  });

  test("ユーザーの登録(パスワードは暗号化)", async () => {
    // "aaaaaa"はハッシュ化されたパスワードとする
    await userRepository.create(
      {
        username: "サザエさん",
        firstname: "いその",
        lastname: "サザエ",
        email: "test3@example.com",
        password: "123456",
      },
      "aaaaaa"
    );

    const user = await userRepository.findById(3);
    const expectedUser: Partial<User> = {
      id: 3,
      username: "サザエさん",
      firstname: "いその",
      lastname: "サザエ",
      email: "test3@example.com",
      password: "aaaaaa",
    };
    expect([user]).toContainEqual(expect.objectContaining(expectedUser));
  });

  test("id=3のユーザーを更新", async () => {
    // "bbbbbb"はハッシュ化されたパスワードとする
    const user = {
      id: 3,
      username: "ちびまる子ちゃん",
      firstname: "さくら",
      lastname: "ももこ",
      email: "test4@example.com",
      password: "bbbbbb",
    };
    await userRepository.update(user);

    const expectedUser: Partial<User> = {
      id: 3,
      username: "ちびまる子ちゃん",
      firstname: "さくら",
      lastname: "ももこ",
      email: "test4@example.com",
      password: "bbbbbb",
    };
    expect([user]).toContainEqual(expect.objectContaining(expectedUser));
  });

  test("id=3のユーザーを削除", async () => {
    await userRepository.delete(3);

    const user = await userRepository.findById(3);
    expect(user).toBe(null);
  });
});
