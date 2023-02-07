import request from "supertest";
import { getBooks, getBook, postBook, putBook, deleteBook } from "./controller/book";
import { registerUser, loginUser, putUser, deleteUser } from "./controller/user";

describe("テスト", () => {
  test("本を全件取得", () => {
    async () => {
      const response = await request(getBooks).get("/books");
      expect(response.statusCode).toBe(200);
    };
  });

  test("特定の本を取得", () => {
    async () => {
      const response = await request(getBook).get("/books/2");
      expect(response.statusCode).toBe(200);
    };
  });

  test("本を投稿", () => {
    async () => {
      const response = await request(postBook).post("/books");
      expect(response.statusCode).toBe(200);
    };
  });

  test("特定の本を更新", () => {
    async () => {
      const response = await request(putBook).put("/books/3");
      expect(response.statusCode).toBe(200);
    };
  });

  test("特定の本を削除", () => {
    async () => {
      const response = await request(deleteBook).put("/books/3");
      expect(response.statusCode).toBe(200);
    };
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
});
