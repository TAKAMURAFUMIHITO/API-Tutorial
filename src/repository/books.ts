import { AppDataSource } from "../data-source";
import { Book } from "../model/Book";

const bookRepository = AppDataSource.getRepository(Book);

export default class BookRepository {
  async findAll() {
    return await bookRepository.find();
  }

  async find(id: number) {
    const book = bookRepository.findOneBy({
      id: id,
    });
    if (book == null) {
      throw new Error("本が見当たりません。");
    }
    return await book;
  }
}
