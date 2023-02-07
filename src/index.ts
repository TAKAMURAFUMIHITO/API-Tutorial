import express from "express";
import AppDataSource from "./data-source";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";

AppDataSource.initialize()
  .then(() => console.log("データソースの初期化が完了しました！"))
  .catch((err) => console.error("データベースの初期化中に以下のようなエラーが発生しました:", err))

const app = express();
app.use(express.json());

// ルーティング
app.use("/books", bookRouter);
app.use("/user", userRouter);

export default app;
