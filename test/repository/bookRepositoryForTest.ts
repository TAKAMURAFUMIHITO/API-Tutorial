import { TestDataSource } from "../../src/data-source";
import { Book } from "../../src/model/Book";

const bookRepository = TestDataSource.getRepository(Book);

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
  async delete(bookId: number) {
    await bookRepository.delete(bookId);
  }
}
