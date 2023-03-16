import { AppDataSource } from "../data-source";
import { Book } from "../model/Book";

const bookRepository = AppDataSource.getRepository(Book);

export default class BookRepository {
  // 本を全件取得
  async findAll() {
    return await bookRepository.find();
  }

  // 特定の本を取得
  async find(id: number) {
    const book = bookRepository.findOneBy({
      id: id,
    });
    if (book == null) {
      throw new Error("本が見当たりません。");
    }
    return await book;
  }

  // 本を投稿
  async create(book: Book) {
    await bookRepository.save({
      ...book,
      userId: book.userId,
    });
  }

  // 特定の本を更新
  async update(book: Book) {
    await bookRepository.save(book);
  }

  // 特定の本を削除
  async delete(book: Book) {
    await bookRepository.remove(book);
  }
}
