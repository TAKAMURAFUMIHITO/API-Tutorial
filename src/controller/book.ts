import { Request, Response } from "express";
import BookRepository from "../repository/books";

const bookRepository = new BookRepository();

// 本を全件取得
export async function getBooks(req: Request, res: Response) {
  try {
    const books = await bookRepository.findAll();
    res.json(books);
  } catch (error) {
    res.status(400).send(error);
  }
}

// 特定の本を取得
export async function getBook(req: Request, res: Response) {
  try {
    const bookId = req.params.id as unknown as number;
    const book = await bookRepository.find(bookId);
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
}
/*

// 本を投稿
export async function postBook(req: Request, res: Response) {
  try {
    const book = new Book(req.body.title, req.body.body, req.body.userId);
    await bookRepository.save(book);
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  };
}

// 特定の本を更新
export async function putBook(req: Request, res: Response) {
  try {
    const bookRequest = req.body;
    const book = await bookRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (book == null) {
      res.status(404).send([
        {
          message: "その本は存在しません。",
        }
      ]);
      return;
    };

  // 一部更新も可能にする
  book.title = req.body.title || book.title;
  book.body = req.body.body || book.body;

  await bookRepository.save(book);
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  };
};

// 特定の本を削除
export async function deleteBook(req: Request, res: Response) {
  try {
    const book = await bookRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (book == null) {
      res.status(404).send([
        {
          message: "その本は存在しません。",
        }
      ]);
      return;
    };
    await bookRepository.remove(book);
    res.send([
      {
        message: "削除しました。",
      }
    ]);
  } catch (error) {
    res.status(400).send(error);
  };
};
*/
