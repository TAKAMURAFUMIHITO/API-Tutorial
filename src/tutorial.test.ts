// import request from "supertest";
// import { app } from "./index";
import { getBooks, getBook, postBook, putBook, deleteBook } from "./controller/book";
import { Request, Response } from "express";
// import { registerUser, loginUser, putUser, deleteUser } from "./controller/user";

import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, dropDatabase, SeederOptions } from 'typeorm-extension';
import { options } from "./data-source";
// import { Book } from "./model/Book"
// import BookSeeder from "./database/seeds/book.seeder";
// import BookFactory from "./database/factories/book.factory";

describe("テスト", () => {
  /*
  const options: DataSourceOptions & SeederOptions = {
    type: "better-sqlite3",
    database: "db.sqlite",
    entities: [Book],
    seeds: [BookSeeder],
    factories: [BookFactory],
  };
  */

  beforeEach(async () => {
    const dataSource = new DataSource(options);
    await dataSource.initialize();
    await runSeeders(dataSource);
  });

  afterEach(async () => {
    await dropDatabase({
      options
    });
  });

  test("本を全件取得", async () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn()
    } as any as Response;
    await getBooks(req, res);
    expect(res.json).toBeCalledWith([{
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(String),
    }]);
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
