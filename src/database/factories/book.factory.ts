import { setSeederFactory } from "typeorm-extension";
import { Book } from "../../model/Book";

export default setSeederFactory(Book, (faker) => {
  const book = new Book(
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    faker.random.numeric() as unknown as number);
  book.title = faker.commerce.productName();
  book.body = faker.commerce.productDescription();
  book.userId = faker.random.numeric() as unknown as number;
  return book;
});
